
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
   const page=await browser.newPage({viewport,deviceScaleFactor:1});
   page.on('pageerror',e=>{throw e});
   await page.goto('http://127.0.0.1:8765/v3/',{waitUntil:'networkidle'});
   await page.screenshot({path:'v3/shot-'+viewport.width+'-cold.png',fullPage:false});
   await page.getByRole('button',{name:/走进那间会议室/}).click();
   await page.getByRole('button',{name:/跳过序章/}).click();
   await page.getByRole('button',{name:/直接调查/}).click();
   await page.locator('[data-npc="0"]').click();
   await page.locator('[data-question="0"]').click();
   await page.locator('[data-npc="1"]').click();
   await page.locator('[data-question="1"]').click();
   await page.locator('[data-file="competition"]').click();
   await page.locator('#returnToInvest').click();
   await page.locator('[data-file="logistics"]').click();
   await page.locator('#returnToInvest').click();
   const restored=await page.evaluate(()=>window.scrollY);if(restored>10)throw new Error('Dossier return failed to reset scroll: '+restored);await page.screenshot({path:'v3/shot-'+viewport.width+'-investigate.png',fullPage:false});
   await page.locator('#toDecision').click();
   await page.locator('[data-option="bridge"]').click();
   await page.locator('#commitBtn').click();
   await page.getByText('一扇新门开了。').waitFor();
   await page.screenshot({path:'v3/shot-'+viewport.width+'-ending.png',fullPage:false});
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+3);
   if(overflow)throw new Error('Horizontal overflow at '+viewport.width);
   console.log('PASS Chromium '+viewport.width+' screenplay, investigation, decision, ending, no overflow');
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
