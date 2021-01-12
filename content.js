const token=""
console.log("This is Bloomberg Market3")



//filtered=Array.from(document.querySelectorAll("a.story-package-module__story__headline-link")).filter(item=>/spacs?/i.test(item.innerText))

window.onload=()=>{
	console.log("Window Loaded")
filtered=Array.from(document.querySelectorAll("a.story-list-story__info__headline-link")).filter(item=>/spacs?/i.test(item.innerText))
filtered1=Array.from(document.querySelectorAll("a.story-package-module__story__headline-link")).filter(item=>/spacs?/i.test(item.innerText))
filtered2=Array.from(document.querySelectorAll("a.single-story-module__related-story-link")).filter(item=>/spacs?/i.test(item.innerText))
filtered3=Array.from(document.querySelectorAll("a.single-story-module__headline-link")).filter(item=>/spacs?/i.test(item.innerText))
filtered4=Array.from(document.querySelectorAll("a.story-package-module__story__headline-link")).filter(item=>/spacs?/i.test(item.innerText))
if(filtered1.length)filtered.push(...filtered1)
if(filtered2.length)filtered.push(...filtered2)
if(filtered3.length)filtered.push(...filtered3)
if(filtered4.length)filtered.push(...filtered4)
let newHeadlines=[];
let newText="";
//console.log("Local Storage",localStorage["headlines"])
const timer=localStorage["timer"]||60000
if(filtered.length){
	storage=JSON.parse(localStorage["headlines"]||"[]")
	
	for(element of filtered){
		if(! (storage.find(item=>item.text.trim()==element.innerText.trim()))){
			const newElement={url:element.href,text:element.innerText.trim()}
			storage.push(newElement)
			newHeadlines.push(newElement)
			newText+=(newElement.text+" : "+newElement.url+"\n\r");
		}
	}
	localStorage["headlines"]=JSON.stringify(storage);
	setTimeout(()=>{
		if(newHeadlines.length){
			postDiscordMessage(newText)
		}else{
			console.log("Realoding without posting");
			window.location.reload()
		}
	},timer)
}

}
function postDiscordMessage(message){
	result=null;
	fetch("https://discordapp.com/api/channels/798509563468185600/messages",{
	method:"POST",
	body:JSON.stringify({content:message}),
	headers:{
	"content-type":"application/json",
	"Authorization": "Bot "+token,
	"User-Agent": "Azndy User Agent"
	}}).then(res=>{
	result=res;console.log("Posted to Discord and Reloaded");
	window.location.reload()
	}).catch(err=>console.log("Error encountered",err))
}