package it.ant.controllers;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.SQLException;
import java.util.Collection;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.sql.DataSource;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.explore.JobExplorer;
import org.springframework.batch.core.launch.support.SimpleJobOperator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import it.ant.batch.ReadProp;
import it.ant.batch.ScheduledTasks;
import it.ant.coponents.dao.StoreFile;
import it.ant.factorytread.CustomThreadFactoryBuilder;
import it.ant.factorytread.SimpleTasks;
import it.ant.ftp.ftp.Zipfile;
@RestController
public class restControl {
	private static String message;		
	@Autowired
	DataSource dataSource;

	@RequestMapping("/db")
	@GetMapping
	public String db() {

		try {

			dataSource.getConnection();
			message= "ok";
		} catch (SQLException e) {
			message= "nope";
			e.printStackTrace();
		}
		return message ;
	}
	@Autowired
	ScheduledTasks com;
	@RequestMapping("/start")
	@GetMapping
	public String start(@RequestParam(name = "jobname") String jobName) {
		try {	
			switch(jobName)
			{
			case "FTP":
				ThreadFactory customThreadfactory = new CustomThreadFactoryBuilder()
				.setDaemon(false)
				.setPriority(Thread.MAX_PRIORITY).build();
				ExecutorService 	 executorService = Executors.newFixedThreadPool(5,customThreadfactory);
				SimpleTasks.RunFtp runny = new  SimpleTasks.RunFtp();
				runny.com=com;
				executorService.execute(runny);
				//com.schedulingFTP();	
				message= "job start";
				break;
			case "DBS":
				customThreadfactory = new CustomThreadFactoryBuilder()
				.setDaemon(false)
				.setPriority(Thread.MAX_PRIORITY).build();
				executorService = Executors.newFixedThreadPool(5,customThreadfactory);
				SimpleTasks.RunDB DB = new  SimpleTasks.RunDB();
				DB.com=com;
				executorService.execute(DB);
				//com.schedulingDB();
				message= "job start";
				break;
			default :
				throw new Exception() ;
			}
		} catch (Exception e) {
			message= "job dosn't exist";
		} 
		return message;
	}
	@RequestMapping(value="/folders", method=RequestMethod.POST, produces="application/json")
	@ResponseBody
	public String getFolders(@RequestParam(name = "myParam")  String message) {
		return "{\"stato\" : \"" +message + "\"   }";
	}

	@RequestMapping(value = "/getupload", method = RequestMethod.GET)
	public ModelAndView getFile()
	{

		System.out.println(prop.getDatabasefolder());	  
		ModelAndView mod= new ModelAndView();
		mod.setViewName("addFile");
		return mod;
	}
	@Autowired
	ReadProp prop;
	private String res="";
	@RequestMapping(value = "/upload", method = RequestMethod.POST, headers = "content-type=multipart/form-data")
	@ResponseBody
	public String uploadChunked(
			final HttpServletRequest request,
			final HttpServletResponse response) throws ServletException {

		res="<html>";
		Collection<Part> files=null;
		try {
			files = request.getParts();
		} catch (IOException e1) {
			return "nessun file Inviato";
		}
		if(files.size()==0)
			throw new  NullPointerException ();
		for(Part file: files)
		{
			try
			{
				if(Zipfile.isGZipped(file.getInputStream()))
				{
					Zipfile.copy(file.getInputStream(), prop.getDatabasefolder() + "/" +file.getName().split("\\\\")[ file.getName().split("\\\\").length-1]);
					res+= " zip salvato con successo:  " + file.getName().split("\\\\")[ file.getName().split("\\\\").length-1] +"<br>";
				}
				else
					res+= "Non è uno zip:  " + file.getName().split("\\\\")[ file.getName().split("\\\\").length-1] +"<br>";
			}catch(Exception e)
			{
				res+= "è uno zip ma non sono riuscito a salvarlo:  " + file.getName().split("\\\\")[ file.getName().split("\\\\").length-1] +"<br>";
			}	
		}	
		return res;
	}
	@GetMapping("/downloadFile")
	public ResponseEntity<byte[]> downloadFile(@RequestParam(name = "name") String fileName, HttpServletRequest request) {
		// Load file as Resource
		byte[] fileContent = null;
		try {
			StoreFile.readFiles(prop.getRequestedfile(), "programmi","programma" , fileName);

		} catch (Exception e1) {
			return   ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		File f=  new File(prop.getRequestedfile() +"//"+ fileName);
		try {
			fileContent = Files.readAllBytes(f.toPath());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			return   ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		String contentType = null;
		contentType = request.getServletContext().getMimeType(f.getAbsolutePath());
		if(contentType == null) 
			contentType = "application/octet-stream";


		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + f.getName() + "\"")
				.body(fileContent);
	}
	@Autowired
	SimpleJobOperator jobOperator;
	@Autowired
	JobExplorer jobExplorer;
	@Autowired
	public Job FTP;
	@Autowired
	public Job DataBaseSalvataggio;
	@RequestMapping("/stop")
	@GetMapping
	public String stop(@RequestParam(name = "jobname") String jobName) 
	{
		String res= "Stopped job with name " + jobName;
		try
		{
			switch( jobName)
			{
			case "FTP":
				for(JobExecution k: jobExplorer.findRunningJobExecutions(FTP.getName()))
					jobOperator.stop(k.getId());
				break;
			case "RemoveOld":
				for(JobExecution k: jobExplorer.findRunningJobExecutions(DataBaseSalvataggio.getName()))
					jobOperator.stop(k.getId());
				break;
			default:
				throw new Exception ();
			}
		}catch(Exception e ) 
		{
			res = "Failed toStop Job with name " + jobName;
		}
		return res;
	}
}


