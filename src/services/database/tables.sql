create table if not exists pessoas(
idPessoa int auto_increment primary key,
CPF_CNPJ char(16) unique,
Nome char(50) not null,
Estado char(25) not null,
Cidade char(50) not null,
Endereço char(70) not null,
Email char(40) not null,
Telefone char(20) not null
);

create table if not exists usuario(
Login char(30) primary key unique,
Senha char(40) not null,
idPessoa int,
foreign key (idPessoa) references tbl_pessoa (idPessoa)
);

create table if not exists visitantes(
idVisitante int primary key not null unique auto_increment,
idPessoa int,
foreign key (idPessoa)references tbl_pessoa(idPessoa)
);

create table if not exists bolsistas(
idBolsista int unique primary key auto_increment,
Login char(30),
nomeResponsavel char(50) not null,
telefoneResponsavel char(20),
idPessoa int,
Inativo boolean,
foreign key (Login) references tbl_usuario(Login),
foreign key (idPessoa) references tbl_usuario(idPessoa) 
);

create table if not exists horarioTrabalhos(
idBolsista int,
inicioPeriodo Date not null,
fimPeriodo Date not null,
foreign key (idBolsista) references tbl_bolsista(idBolsista)
);

create table if not exists funcionarios(
idFuncionario int primary key not null unique auto_increment,
Login char(30),
idPessoa int,
idPermissoes int,
Inativo boolean not null,
adm boolean not null,
foreign key (Login) references tbl_usuario (Login),
foreign key (idPessoa) references tbl_usuario (idPessoa)
);

create table if not exists relatorios(
idRelatorio int primary key unique not null auto_increment,
idFuncionario int,
criadoEm Date not null,
foreign key (idFuncionario) references tbl_Funcionario(idFuncionario)
);

create table if not exists permissoes(
idPermissoes int unique primary key auto_increment,
idFuncionario int,
gerirBolsistas boolean not null,
gerirFuncionarios boolean not null,
validarAgendamentos boolean not null,
confirmarVisista boolean not null,
gerarRelatorio boolean not null,
inserirAtividade boolean not null,
cadastrarAtracao boolean not null,
gerirHorarioBolsista boolean not null,
foreign key (idFuncionario) references tbl_funcionario(idFuncionario)
);

alter table funcionarios
add constraint fk_idPermissoes
foreign key (idPermissoes) references permissoes(idPermissoes);

create table if not exists individuoVisitantes(
RG char(15) primary key not null unique,
idVisitante int,
foreign key (idVisitante) references tbl_visitante (idVisitante)
);

create table if not exists escolas(
idEscola int primary key unique auto_increment,
idVisitante int,
nomeResponsavel char(50) not null,
telefoneResponsavel char(20),
Login char,
idPessoa int,
foreign key (idVisitante) references visitantes (idVisitante),
foreign key (Login) references usuarios (Login),
foreign key (idPessoa) references usuarios (idPessoa)
);

create table if not exists visitas(
idVisitante int,
numAlunos int not null,
Responsavel char(50) not null,
status int not null
);

create table if not exists atracoes(
Nome char(25) primary key not null,
incioPeriodo Time not null,
fimPeriodo Time not null,
Descricao text,
Tipo int not null
);

create table if not exists horarios(
_data Date primary key not null,
hora Time not null
)
