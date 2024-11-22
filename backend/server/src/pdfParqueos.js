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

function addSubTitle(doc, content, yPos) {
  doc
    .setFont(undefined, "bold")
    .setFontSize(12)
    .text(30, yPos, content)
    .setFont(undefined, "normal")
    .setFontSize(10);
}

function genFuncPDF(campus, lista_parqueos) {
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
    .text(20 + titlex, 30 + titley, "Informe de los parqueos registrados")
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


  lista_parqueos.forEach((parqueo) => {
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
        "Parqueo identificación " + parqueo._id_parqueo
      )
      .setFont(undefined, "normal")
      .setFontSize(10);

    yOffset += 15;

    addInfo(doc, "Tipo:", parqueo.tipo, xOffset, yOffset);

    yOffset += ySeparation;

    if (parqueo.tipo == "Subcontratado") {
      addInfo(doc, "Identificación del contrato:", parqueo.id_contrato, xOffset, yOffset);
      yOffset += ySeparation;

      addInfo(doc, "Contacto:", parqueo.contacto, xOffset, yOffset);
      yOffset += ySeparation;
    }

    addInfo(doc, "Campus:", parqueo.campus, xOffset, yOffset);

    yOffset += ySeparation;

    addInfo(doc, "Dirección:", parqueo.direccion, xOffset, yOffset);

    yOffset += ySeparation;

    addInfo(
      doc,
      "Capacidad Total:",
      parqueo.capacidad_total.toString(),
      xOffset,
      yOffset
    );

    yOffset += ySeparation;

    addInfo(
      doc,
      "Capacidad Actual:",
      parqueo.capacidad_actual.toString(),
      xOffset,
      yOffset
    );

    yOffset += ySeparation + 5;

    addSubTitle(
      doc,
      "Cantidad campos asignados",
      yOffset
    );

    yOffset += ySeparation - 5;

    var table_body = [];

    var row = [];

    row.push(parqueo.espacios_jefatura.toString());
    row.push(parqueo.espacios_VOficiales.toString());
    row.push(parqueo.espacios_asignados.toString());
    row.push(parqueo.espacios_visitantes.toString());
    row.push(parqueo.espacios_NEspeciales.toString());
    table_body.push(row);

    doc.autoTable({
      head: [["Jefatura", "VOficiales", "Asignados TEC", "Visitantes TEC", "Nec. Especiales"]],
      body: table_body,
      startY: yOffset,
      tableWidth: "auto",
      margin: { left: 30, right: 30 },
    });

    yOffset += ySeparation + 15;

    addSubTitle(
      doc,
      "Horario del parqueo",
      yOffset
    );

    yOffset += ySeparation - 5;

    var table_body = [];

    var row = [];

    parqueo.horario.forEach((horario) => {
      row.push(horario.dia);
      row.push(horario.hora_entrada);
      row.push(horario.hora_salida);
      table_body.push(row);
      row = [];
    });

    doc.autoTable({
      head: [["Día", "Hora de Entrada", "Hora de salida"]],
      body: table_body,
      startY: yOffset,
      tableWidth: "auto",
      margin: { left: 30, right: 30 },
    });
  });

  doc.save("PDFParqueos.pdf");
}

function genParqueosPDF() {
  var doc = new jsPDF();

  doc.text(20, 20, "TEST Message!!");
  doc.addPage();
  doc.text(20, 20, "TEST Page 2!");
  doc.save("PDFParqueos.pdf");
}

const json_simulator = [
  {
    "_id": "6274404cf484749f0a74e505",
    "_id_parqueo": "Parqueo A",
    "tipo": "Principal",
    "capacidad_total": 50,
    "capacidad_actual": 0,
    "horario": [
      {
        "dia": "Martes",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "6274404cf484749f0a74e506"
      },
      {
        "dia": "Miercoles",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "6274404cf484749f0a74e507"
      }
    ],
    "espacios": [
      {
        "_id": "1",
        "tipo": "A",
        "ocupado": "0"
      },
      {
        "_id": "2",
        "tipo": "A",
        "ocupado": "0"
      }
    ],
    "campus": "SJ",
    "espacios_jefatura": 10,
    "espacios_VOficiales": 10,
    "espacios_asignados": 10,
    "espacios_visitantes": 10,
    "espacios_NEspeciales": 10,
    "direccion": "Cerca",
    "id_contrato": "91",
    "contacto": "Impropio",
    "createdAt": "2022-05-05T21:23:24.067Z",
    "updatedAt": "2022-05-05T21:23:24.067Z"
  },
  {
    "_id": "62744087f484749f0a74e509",
    "_id_parqueo": "Parqueo B",
    "tipo": "Subcontratado",
    "capacidad_total": 50,
    "capacidad_actual": 0,
    "horario": [
      {
        "dia": "Martes",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "62744087f484749f0a74e50a"
      },
      {
        "dia": "Miercoles",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "62744087f484749f0a74e50b"
      }
    ],
    "espacios": [
      {
        "_id": "1",
        "tipo": "A",
        "ocupado": "0"
      },
      {
        "_id": "2",
        "tipo": "A",
        "ocupado": "0"
      }
    ],
    "campus": "SJ",
    "espacios_jefatura": 10,
    "espacios_VOficiales": 10,
    "espacios_asignados": 10,
    "espacios_visitantes": 10,
    "espacios_NEspeciales": 10,
    "direccion": "Cerca",
    "id_contrato": "100",
    "contacto": "Impropio2",
    "createdAt": "2022-05-05T21:24:23.161Z",
    "updatedAt": "2022-05-05T21:24:23.161Z"
  },
  {
    "_id": "627710dcb86db6468c169e43",
    "_id_parqueo": "110",
    "tipo": "Principal",
    "capacidad_total": 100,
    "capacidad_actual": 0,
    "horario": [
      {
        "dia": "Lunes",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "627710dcb86db6468c169e44"
      },
      {
        "dia": "Martes",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "627710dcb86db6468c169e45"
      },
      {
        "dia": "Miercoles",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "627710dcb86db6468c169e46"
      },
      {
        "dia": "Jueves",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "627710dcb86db6468c169e47"
      },
      {
        "dia": "Viernes",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "627710dcb86db6468c169e48"
      }
    ],
    "espacios": [],
    "campus": "SJ",
    "espacios_jefatura": 10,
    "espacios_VOficiales": 10,
    "espacios_asignados": 10,
    "espacios_visitantes": 10,
    "espacios_NEspeciales": 10,
    "direccion": "A la par del TEC",
    "createdAt": "2022-05-08T00:37:48.217Z",
    "updatedAt": "2022-05-08T00:37:48.217Z"
  },
  {
    "_id": "62771273b86db6468c169e4a",
    "_id_parqueo": "150",
    "tipo": "Subcontratado",
    "capacidad_total": 100,
    "capacidad_actual": 0,
    "horario": [
      {
        "dia": "Lunes",
        "hora_entrada": "9:00",
        "hora_salida": "20:00",
        "_id": "62771273b86db6468c169e4b"
      },
      {
        "dia": "Martes",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "62771273b86db6468c169e4c"
      },
      {
        "dia": "Miercoles",
        "hora_entrada": "8:00",
        "hora_salida": "20:00",
        "_id": "62771273b86db6468c169e4d"
      },
      {
        "dia": "Jueves",
        "hora_entrada": "7:00",
        "hora_salida": "22:00",
        "_id": "62771273b86db6468c169e4e"
      },
      {
        "dia": "Viernes",
        "hora_entrada": "7:00",
        "hora_salida": "22:00",
        "_id": "62771273b86db6468c169e4f"
      }
    ],
    "espacios": [],
    "campus": "Cartago",
    "espacios_jefatura": 20,
    "espacios_VOficiales": 20,
    "espacios_asignados": 20,
    "espacios_visitantes": 20,
    "espacios_NEspeciales": 20,
    "direccion": "A la par del TEC al lado contrario",
    "id_contrato": "102",
    "contacto": "Impropio3",
    "createdAt": "2022-05-08T00:44:35.330Z",
    "updatedAt": "2022-05-08T00:44:35.330Z"
  },
  {
    "_id": "62771335b86db6468c169e51",
    "_id_parqueo": "La bomba",
    "tipo": "Principal",
    "capacidad_total": 100,
    "capacidad_actual": 0,
    "horario": [
      {
        "dia": "Lunes",
        "hora_entrada": "9:00",
        "hora_salida": "20:00",
        "_id": "62771335b86db6468c169e52"
      },
      {
        "dia": "Martes",
        "hora_entrada": "7:00",
        "hora_salida": "20:00",
        "_id": "62771335b86db6468c169e53"
      },
      {
        "dia": "Miercoles",
        "hora_entrada": "8:00",
        "hora_salida": "20:00",
        "_id": "62771335b86db6468c169e54"
      },
      {
        "dia": "Jueves",
        "hora_entrada": "7:00",
        "hora_salida": "22:00",
        "_id": "62771335b86db6468c169e55"
      },
      {
        "dia": "Viernes",
        "hora_entrada": "7:00",
        "hora_salida": "22:00",
        "_id": "62771335b86db6468c169e56"
      }
    ],
    "espacios": [],
    "campus": "Limon",
    "espacios_jefatura": 20,
    "espacios_VOficiales": 20,
    "espacios_asignados": 20,
    "espacios_visitantes": 20,
    "espacios_NEspeciales": 20,
    "direccion": "A la par del TEC al lado contrario",
    "id_contrato": "104",
    "contacto": "Impropio5",
    "createdAt": "2022-05-08T00:47:49.149Z",
    "updatedAt": "2022-05-08T00:47:49.149Z"
  }
];

genFuncPDF("Instituto Tecnológico de Costa Rica", json_simulator);