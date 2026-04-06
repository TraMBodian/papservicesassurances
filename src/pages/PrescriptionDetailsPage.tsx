import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pill, User, Calendar, FileText, Download, Printer } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mockPrescriptions = [
  {
    id: "1",
    numero: "ORD-2024-001",
    assure: "Moussa Diop",
    medecin: "Dr. Abdoulaye Diallo",
    date: "2024-07-20",
    medicaments: [
      { nom: "Paracétamol 500mg", dosage: "1 comprimé 3x/jour", duree: "5 jours" },
      { nom: "Amoxicilline 1g", dosage: "1 comprimé 2x/jour", duree: "7 jours" }
    ],
    instructions: "À prendre après les repas. Boire beaucoup d'eau.",
    statut: "Active"
  }
];

export default function PrescriptionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const prescription = mockPrescriptions.find(p => p.id === id) || mockPrescriptions[0];

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Ordonnance ${prescription.numero}</title>
          <style>
            @page { margin: 1.5cm; size: A4; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.4;
              color: #000;
            }
            .container { 
              border: 3px solid #000;
              padding: 15px;
              height: 27cm;
              position: relative;
              display: flex;
              flex-direction: column;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 15px;
            }
            .header h1 {
              font-size: 18pt;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .header p {
              font-size: 10pt;
              margin: 2px 0;
            }
            .info-section {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              font-size: 11pt;
            }
            .info-box {
              flex: 1;
            }
            .label {
              font-weight: bold;
              text-decoration: underline;
            }
            .rx-symbol {
              font-size: 30pt;
              font-weight: bold;
              text-align: center;
              margin: 15px 0;
              font-family: serif;
            }
            .medications {
              flex: 1;
              margin: 15px 0;
              overflow: hidden;
              max-height: 400px;
            }
            .med-item {
              margin: 10px 0;
              padding-left: 20px;
              page-break-inside: avoid;
            }
            .med-name {
              font-weight: bold;
              font-size: 13pt;
            }
            .med-details {
              margin-left: 20px;
              margin-top: 5px;
            }
            .instructions-box {
              border: 1px solid #000;
              padding: 8px;
              margin: 15px 0;
              min-height: 60px;
              max-height: 100px;
              overflow: hidden;
            }
            .instructions-title {
              font-weight: bold;
              text-decoration: underline;
              margin-bottom: 8px;
            }
            .signature-section {
              margin-top: auto;
              padding-top: 20px;
              text-align: right;
            }
            .signature-line {
              width: 200px;
              border-top: 1px solid #000;
              margin: 30px 0 5px auto;
              padding-top: 5px;
              text-align: center;
            }
            .footer {
              margin-top: 10px;
              text-align: center;
              font-size: 9pt;
              border-top: 1px solid #000;
              padding-top: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ORDONNANCE MÉDICALE</h1>
              <p>République du Sénégal</p>
              <p>Ministère de la Santé et de l'Action Sociale</p>
            </div>
            
            <div class="info-section">
              <div class="info-box">
                <p><span class="label">N°:</span> ${prescription.numero}</p>
                <p><span class="label">Date:</span> ${prescription.date}</p>
              </div>
              <div class="info-box" style="text-align: right;">
                <p><span class="label">Dr.</span> ${prescription.medecin}</p>
              </div>
            </div>

            <div class="info-section">
              <div class="info-box">
                <p><span class="label">Nom du patient:</span> ${prescription.assure}</p>
              </div>
            </div>

            <div class="rx-symbol">&#8478;</div>
            
            <div class="medications">
              ${prescription.medicaments.map((med, idx) => `
                <div class="med-item">
                  <div class="med-name">${idx + 1}/ ${med.nom}</div>
                  <div class="med-details">
                    <p>Posologie: ${med.dosage}</p>
                    <p>Durée: ${med.duree}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="instructions-box">
              <div class="instructions-title">Recommandations:</div>
              <p>${prescription.instructions}</p>
            </div>

            <div class="signature-section">
              <div class="signature-line">
                Signature et cachet
              </div>
            </div>

            <div class="footer">
              <p>Cette ordonnance est valable 30 jours - SantéAssur - Tél: +221 33 123 45 67</p>
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1100;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 800, 1100);

    ctx.fillStyle = '#2563eb';
    ctx.fillRect(0, 0, 800, 120);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('ORDONNANCE MÉDICALE', 50, 50);
    ctx.font = '18px Arial';
    ctx.fillText('République du Sénégal - Ministère de la Santé', 50, 85);

    ctx.fillStyle = 'black';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`Ordonnance N°: ${prescription.numero}`, 50, 160);
    ctx.fillText(`Date: ${prescription.date}`, 550, 160);
    
    ctx.font = '14px Arial';
    ctx.fillText(`Patient: ${prescription.assure}`, 50, 200);
    ctx.fillText(`Médecin: ${prescription.medecin}`, 50, 230);

    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 260);
    ctx.lineTo(750, 260);
    ctx.stroke();

    ctx.font = 'bold 18px Arial';
    ctx.fillText('MÉDICAMENTS PRESCRITS:', 50, 300);
    
    let yPos = 340;
    ctx.font = '14px Arial';
    prescription.medicaments.forEach((med, idx) => {
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`${idx + 1}. ${med.nom}`, 70, yPos);
      ctx.font = '14px Arial';
      ctx.fillText(`   Dosage: ${med.dosage}`, 70, yPos + 25);
      ctx.fillText(`   Durée: ${med.duree}`, 70, yPos + 50);
      yPos += 90;
    });

    yPos += 20;
    ctx.font = 'bold 16px Arial';
    ctx.fillText('INSTRUCTIONS:', 50, yPos);
    ctx.font = '14px Arial';
    ctx.fillText(prescription.instructions, 70, yPos + 30);

    yPos += 100;
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(450, yPos);
    ctx.lineTo(700, yPos);
    ctx.stroke();
    ctx.font = '12px Arial';
    ctx.fillText('Signature et cachet du médecin', 480, yPos + 20);

    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    ctx.fillText('Cette ordonnance est valable 30 jours', 50, 1050);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ordonnance-${prescription.numero}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <AppLayout title={`Ordonnance ${prescription.numero}`}>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/prescriptions')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" /> Imprimer
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Télécharger
            </Button>
          </div>
        </div>

        <Card className="p-8" id="prescription-content">
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Ordonnance Médicale</h2>
                <p className="text-muted-foreground">République du Sénégal - Ministère de la Santé</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-semibold text-lg">{prescription.numero}</p>
                <p className="text-sm text-muted-foreground">Date: {prescription.date}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <User className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-blue-900">Patient</p>
              </div>
              <p className="text-lg font-bold">{prescription.assure}</p>
            </Card>

            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <p className="font-semibold text-purple-900">Médecin prescripteur</p>
              </div>
              <p className="text-lg font-bold">{prescription.medecin}</p>
            </Card>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Pill className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold">Médicaments prescrits</h3>
            </div>
            <div className="space-y-4">
              {prescription.medicaments.map((med, idx) => (
                <Card key={idx} className="p-4 border-l-4 border-l-blue-600">
                  <p className="font-bold text-lg mb-2">{idx + 1}. {med.nom}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Posologie</p>
                      <p className="font-medium">{med.dosage}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Durée du traitement</p>
                      <p className="font-medium">{med.duree}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-4 bg-yellow-50 border-yellow-200 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-yellow-700" />
              <p className="font-semibold text-yellow-900">Instructions particulières</p>
            </div>
            <p className="text-sm">{prescription.instructions}</p>
          </Card>

          <div className="border-t pt-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Statut de l'ordonnance</p>
                <span className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border font-medium bg-green-100 text-green-700 border-green-200">
                  {prescription.statut}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">Signature et cachet du médecin</p>
                <div className="w-48 h-16 border-t-2 border-blue-600"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>Cette ordonnance est valable 30 jours à compter de la date d'émission</p>
            <p className="mt-1">SantéAssur - Tél: +221 33 123 45 67 - Email: contact@asc.sn</p>
          </div>
        </Card>
      </div>
      </div>
    </AppLayout>
  );
}
