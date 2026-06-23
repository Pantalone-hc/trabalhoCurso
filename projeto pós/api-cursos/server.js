const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = 'segredo_super_seguro_da_pos';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ mensagem: 'Não autorizado' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuarioId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ mensagem: 'Token inválido' });
    }
};

app.post('/usuarios', async (req, res) => {
    const { nome, email, senha, nascimento } = req.body;
    try {
        const hash = await bcrypt.hash(senha, 10);
        await prisma.aluno.create({
            data: { nome, email, senha: hash, nascimento }
        });
        res.status(200).json({ mensagem: 'Usuário criado' });
    } catch (error) {
        res.status(400).json({ mensagem: 'Email já cadastrado' });
    }
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const aluno = await prisma.aluno.findUnique({ where: { email } });
    
    if (!aluno || !(await bcrypt.compare(senha, aluno.senha))) {
        return res.status(400).json({ mensagem: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: aluno.id }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
    res.status(200).json({ mensagem: 'Login com sucesso' });
});

app.get('/cursos', async (req, res) => {
    const cursos = await prisma.curso.findMany({
        where: { inicio: { gt: new Date() } },
        include: { _count: { select: { inscricoes: true } } }
    });

    const formatados = cursos.map(c => ({
        id: c.id.toString(),
        nome: c.nome,
        descricao: c.descricao,
        capa: c.capa,
        inscricoes: c._count.inscricoes,
        inicio: c.inicio.toISOString(),
        inscrito: false
    }));
    res.status(200).json(formatados);
});

app.post('/cursos/:idCurso', authMiddleware, async (req, res) => {
    const cursoId = parseInt(req.params.idCurso);
    try {
        await prisma.inscricao.create({
            data: { alunoId: req.usuarioId, cursoId }
        });
        res.status(200).json({ mensagem: 'Inscrição feita' });
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ou já inscrito' });
    }
});

app.delete('/cursos/:idCurso', authMiddleware, async (req, res) => {
    const cursoId = parseInt(req.params.idCurso);
    try {
        await prisma.inscricao.update({
            where: { alunoId_cursoId: { alunoId: req.usuarioId, cursoId } },
            data: { data_cancelamento: new Date() }
        });
        res.status(200).json({ mensagem: 'Cancelado' });
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao cancelar' });
    }
});

app.get('/:idUsuario', authMiddleware, async (req, res) => {
    const inscricoes = await prisma.inscricao.findMany({
        where: { alunoId: req.usuarioId },
        include: { curso: true }
    });

    const formatados = inscricoes.map(i => ({
        id: i.curso.id.toString(),
        nome: i.curso.nome,
        descricao: i.curso.descricao,
        capa: i.curso.capa,
        inscricoes: 0,
        inicio: i.curso.inicio.toISOString(),
        inscricao_cancelada: i.data_cancelamento !== null,
        inscrito: true
    }));
    res.status(200).json(formatados);
});

app.listen(3333, () => console.log('API rodando na porta 3333!'));