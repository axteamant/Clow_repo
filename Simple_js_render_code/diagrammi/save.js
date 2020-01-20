function saved(kali,diagrams,SaveFileName,loadEditor)
{
	
	var myJSON = JSON.stringify(diagrams[kali]);
	const blob = new Blob([myJSON])
	const fileStream = streamSaver.createWriteStream
													(
														SaveFileName!=''?
														SaveFileName + ".json":
														"default.json"	, {size: blob.size}
													)  
	const readableStream = blob.stream()
	if(loadEditor)
	var myWindow = window.open("editorfolder/editor.html?id=" + kali,
	"MsgWindow", "width =400",
	"height=400");
	if (window.WritableStream && readableStream.pipeTo) 
		{
          return readableStream.pipeTo(fileStream)
            .then(() => console.log('done writing'))
		}

	
	}