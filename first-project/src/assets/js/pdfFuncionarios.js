import { jsPDF } from "jspdf";
import "jspdf-autotable";

function addInfo(doc, category, content, xPos, yPos) {
  doc
    .setFont(undefined, "bold")
    .text(30, yPos, category)
    .setFont(undefined, "normal")
    .setFontSize(10);

  doc.text(xPos, yPos, content);
}
function genFuncPDF(campus, lista_func) {
  var doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
  });

  const titlex = 10;
  const titley = 10;

  doc
    .setFont(undefined, "bold")
    .setFontSize(20)
    .text(20 + titlex, 30 + titley, "Informe de funcionarios del campus")
    .setFont(undefined, "normal");
  doc
    .setFont(undefined, "bold")
    .setFontSize(20)
    .text(20 + titlex, 40 + titley, campus)
    .setFont(undefined, "normal");

  doc.setDrawColor(36, 74, 137);
  doc.setLineWidth(2);
  doc.line(20 + titlex, 55 + titley, 175, 55 + titley); //195

  const genTime = new Date().toLocaleTimeString(); // 11:18:48 AM

  const genDate = new Date().toLocaleDateString(); // 11/16/2015

  doc
    .setFont(undefined, "bold")
    .setFontSize(15)
    .text(20 + titlex, 240 + titley, genDate)
    .setFont(undefined, "normal");

    doc
    .setFont(undefined, "bold")
    .setFontSize(15)
    .text(20 + titlex, 250 + titley, genTime)
    .setFont(undefined, "normal");


  lista_func.forEach((funcionario) => {
    doc.addPage();
    var yOffset = 30;
    var xOffset = 80;
    var ySeparation = 9;
    doc
      .setFont(undefined, "bold")
      .setFontSize(17)
      .text(
        20,
        yOffset,
        "Funcionario identificación " + funcionario.identificacion
      )
      .setFont(undefined, "normal")
      .setFontSize(10);

    yOffset += 15;

    addInfo(doc, "Nombre:", funcionario.nombre_completo, xOffset, yOffset);

    yOffset += ySeparation;

    addInfo(
      doc,
      "Tipo de funcionario:",
      funcionario.tipo_funcionario,
      xOffset,
      yOffset
    );

    yOffset += ySeparation;

    addInfo(
      doc,
      "Correo Insitucional:",
      funcionario.correo_institucional,
      xOffset,
      yOffset
    );

    yOffset += ySeparation;

    addInfo(
      doc,
      "Correo Alterno:",
      funcionario.correo_alterno,
      xOffset,
      yOffset
    );
    yOffset += ySeparation;
    addInfo(
      doc,
      "Administrativo:",
      funcionario.admin ? "Sí" : "No",
      xOffset,
      yOffset
    );
    yOffset += ySeparation;
    addInfo(
      doc,
      "Jefatura:",
      funcionario.jefatura ? "Sí" : "No",
      xOffset,
      yOffset
    );
    yOffset += ySeparation;
    addInfo(
      doc,
      "Incapacitado:",
      funcionario.incapacitado ? "Sí" : "No",
      xOffset,
      yOffset
    );

    var table_body = [];

    var row = [];

    funcionario.departamentos.forEach((departamento) => {
      row.push(departamento.campus);
      row.push(departamento.departamento);
      table_body.push(row);
      row = [];
    });

    doc.autoTable({
      head: [["Campus", "Departamento"]],
      body: table_body,
      startY: 115,
      tableWidth: 75,
      margin: { left: 110 },
    });

    var table_body = [];

    var row = [];

    funcionario.placas_asociadas.forEach((placa) => {
      row.push("Número de placa: " + placa.codigo_placa);
      table_body.push(row);
      row = [];
    });

    doc.autoTable({
      head: [["Placas Asociadas"]],
      body: table_body,
      startY: 115,
      tableWidth: 75,
      margin: { left: 30 },
    });

    doc.addPage();

    doc
      .setFont(undefined, "bold")
      .setFontSize(17)
      .text(20, 30, "Horarios de funcionario")
      .setFont(undefined, "normal")
      .setFontSize(10);

    var table_body = [];

    var row = [];

    funcionario.horario.forEach((horario) => {
      row.push(horario.dia);
      row.push(horario.hora_entrada);
      row.push(horario.hora_salida);
      table_body.push(row);
      row = [];
    });

    doc.autoTable({
      head: [["Día", "Hora de Entrada", "Hora de salida"]],
      body: table_body,

      startY: 40,
      pageBreak: "auto", // 'auto', 'avoid' or 'always'
      tableWidth: "auto",
      margin: { left: 30, right: 30 },
    });
  });

  doc.save("Test.pdf");
}

function genParqueosPDF() {
  var doc = new jsPDF();

  doc.text(20, 20, "TEST Message!!");
  doc.addPage();
  doc.text(20, 20, "TEST Page 2!");
  doc.save("Test.pdf");
}

const json_simulator = [
  {
    identificacion: "123456789",
    nombre_completo: "La guapa Rodríguez",
    contrasenna: "12345",
    celular: "87273992",
    horario: [
      {
        dia: "Lunes",
        hora_entrada: "8",
        hora_salida: "16",
      },
      {
        dia: "Miercoles",
        hora_entrada: "8",
        hora_salida: "16",
      },
      {
        dia: "Lunes",
        hora_entrada: "8",
        hora_salida: "16",
      },
      {
        dia: "Miercoles",
        hora_entrada: "8",
        hora_salida: "16",
      },
      {
        dia: "Lunes",
        hora_entrada: "8",
        hora_salida: "16",
      },
      {
        dia: "Miercoles",
        hora_entrada: "8",
        hora_salida: "16",
      },
      {
        dia: "Lunes",
        hora_entrada: "8",
        hora_salida: "16",
      },
      {
        dia: "Miercoles",
        hora_entrada: "8",
        hora_salida: "16",
      },
    ],
    correo_institucional: "a@g",
    correo_alterno: "r@j",
    departamentos: [
      {
        id: "23",
        campus: "CA",
        departamento: "Elec",
      },
      {
        id: "24",
        campus: "CV",
        departamento: "PL",
      },
      {
        id: "25",
        campus: "SS",
        departamento: "XC",
      },
    ],
    tipo_funcionario: "Docente",
    placas_asociadas: [{ codigo_placa: "abc" }, { codigo_placa: "PLACA 2" }],
    admin: 1,
    jefatura: 1,
    campus_departamento_jefatura: {
      campus: "Cartago",
      departamento: "Computación",
    },
    incapacitado: 0,
  },
  {
    identificacion: "1188118811",
    nombre_completo: "El Guapo Porras",
    contrasenna: "12345",
    celular: "89898998",
    horario: [
      {
        dia: "Lunes",
        hora_entrada: "8",
        hora_salida: "16",
      },
      {
        dia: "Miercoles",
        hora_entrada: "8",
        hora_salida: "16",
      },
    ],
    correo_institucional: "a@g",
    correo_alterno: "r@j",
    departamentos: [
      {
        id: "23",
        campus: "CA",
        departamento: "Elec",
      },
      {
        id: "24",
        campus: "CV",
        departamento: "PL",
      },
      {
        id: "25",
        campus: "SS",
        departamento: "XC",
      },
    ],
    tipo_funcionario: "Docente",
    placas_asociadas: [{ codigo_placa: "c" }],
    admin: 1,
    jefatura: 1,
    campus_departamento_jefatura: {
      campus: "Cartago",
      departamento: "Computación",
    },
    incapacitado: 0,
  },
];

genFuncPDF("Tecnológico Local San José", json_simulator);
