import * as path from 'path';
import * as AdmZip from 'adm-zip';
import * as fs from 'fs';

export default async function unZip(zipFileName: string) {
  const tmpDir = path.dirname(zipFileName);
  const zip = new AdmZip(zipFileName);
  const zipEntries = zip.getEntries();

  zip.extractAllTo(tmpDir, true);

  console.log(zipEntries);

  const files = zipEntries.map((entry: AdmZip.IZipEntry) => {
    const fullPath = path.join(tmpDir, entry.entryName);
    console.log(fs.readFileSync(fullPath, 'utf-8'));
    return fullPath;
  });
  console.log(files);
}
