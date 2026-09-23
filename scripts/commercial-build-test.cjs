const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const files=[...new Set(execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean))];
const folder=fs.mkdtempSync(path.join(os.tmpdir(),'zadoni-commercial-build-'));
for(const f of files){const target=path.join(folder,f);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,f),target);}
for(let run=1;run<=2;run++){
  console.log(execFileSync(process.execPath,['scripts/build-portal.js'],{cwd:folder,encoding:'utf8'}));
  const changes=files.filter(f=>!fs.readFileSync(path.join(root,f)).equals(fs.readFileSync(path.join(folder,f))));
  assert.deepEqual(changes,[],`Build ${run} não deve alterar saídas já geradas ou conteúdo histórico`);
}
console.log(execFileSync(process.execPath,['scripts/seo-audit.js'],{cwd:folder,encoding:'utf8'}));
console.log('BUILD COMERCIAL: geração completa e idempotência aprovadas em cópia isolada. '+folder);
