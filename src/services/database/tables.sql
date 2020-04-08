create table if not exists pessoas(
idPessoa int auto_increment primary key,
CPF_CNPJ char(16) unique,
nome char(50) not null,
estado char(25) not null,
cidade char(50) not null,
rua char(40) not null,
email char(40) not null,
numero tinyint,
surname char(20),
telefone char(20) not null
);

create table if not exists usuarios(
Login char(30) primary key,
Senha char(40) not null,
idPessoa int,
foreign key (idPessoa) references pessoas (idPessoa)
);

create table if not exists visitantes(
idVisitante int primary key not null auto_increment,
idPessoa int,
foreign key (idPessoa)references tbl_pessoa(idPessoa)
);

create table if not exists bolsistas(
idBolsista int primary key auto_increment,
Login char(30),
idPessoa int,
inativo boolean,
matricula char(20) not null,
foreign key (Login) references tbl_usuario(Login),
foreign key (idPessoa) references tbl_usuario(idPessoa) 
);

create table if not exists horarioTrabalho(
idBolsista int,
inicioPeriodo time not null,
fimPeriodo time not null,
semana tinyint not null,
foreign key (idBolsista) references tbl_bolsista(idBolsista)
);

create table if not exists funcionarios(
idFuncionario int primary key not null auto_increment,
Login char(30),
idPessoa int,
idPermissoes int,
inativo boolean not null,
adm boolean not null,
foreign key (Login) references usuarios (Login),
foreign key (idPessoa) references pessoas (idPessoa)
);

create table if not exists relatorios(
idRelatorio int primary key unique not null auto_increment,
idFuncionario int,
criadoEm Date not null,
relatorio mediumblob not null,
foreign key (idFuncionario) references tbl_Funcionario(idFuncionario)
);

create table if not exists permissoes(
idPermissoes int unique primary key auto_increment,
idFuncionario int,
gerirBolsistas boolean not null,
gerirFuncionarios boolean not null,
validarAgendamentos boolean not null,
gerarRelatorio boolean not null,
inserirAtividade boolean not null,
gerirHorarioBolsista boolean not null,
gerirBackup boolean not null,
gerirEscolas boolean not null,
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
tipoEscola tinyint not null,
repSurname char(40),
foreign key (idVisitante) references visitantes (idVisitante),
foreign key (Login) references usuarios (Login),
foreign key (idPessoa) references usuarios (idPessoa)
);

create table if not exists visitas(
idVisitante int,
agendamento datetime,
numAlunos int not null,
Responsavel char(50) not null,
status tinyint,
atracoes tinytext not null,
);

create table if not exists atracoes(
Nome char(25) primary key not null,
incioPeriodo Time not null,
fimPeriodo Time not null,
descricao text,
tipo int not null,
semana tinyint,
);
