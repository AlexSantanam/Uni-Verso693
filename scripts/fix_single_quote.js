import fs from 'fs';

let text = fs.readFileSync('src/components/ProspeccionTab.tsx', 'utf-8');
text = text.replace("nombreEmpresa: 'Clínica Veterinaria Pet's Center'", "nombreEmpresa: 'Clínica Veterinaria Pet\\'s Center'");
text = text.replace("Veterinaria Pet's Center", "Veterinaria Pet\\'s Center");

fs.writeFileSync('src/components/ProspeccionTab.tsx', text, 'utf-8');
console.log('Fixed quotes in ProspeccionTab.tsx!');

