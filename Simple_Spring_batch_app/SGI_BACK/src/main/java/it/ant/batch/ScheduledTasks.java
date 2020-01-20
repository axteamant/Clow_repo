package it.ant.batch;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.support.SimpleJobOperator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * <H1>ScheduledTasks</H1>
 * E' la classe che definisce la schedulazione dei Jobs del
 * batch
 * @author Stefano G. Alexei V.
 *
 */
@Component
@EnableScheduling
@EnableAutoConfiguration
public class ScheduledTasks
{
	

	@Autowired
	public SimpleJobOperator jobOperator;
	@Autowired
	public JobLauncher jobLauncher;

	@Autowired
	public Job FTP;
//	
	/**
	 *  Primo del mase al 1 di notte
	 */
	@Scheduled(cron ="0 0 1 1 * ?" )
public void schedulingFTP() {

	try
	{
	
        String jobParameters =  System.currentTimeMillis() +"";
        jobOperator.start( FTP.getName(),jobParameters );
	}catch(Exception e) {}
	
}
@Autowired
public Job DataBaseSalvataggio;
/**
 * 
 * Ogni 30 min 
 */
@Scheduled(cron ="0 */30 * ? * *" )
public void schedulingDB() {

	try
	{
        String jobParameters =  System.currentTimeMillis() +"";
        jobOperator.start( DataBaseSalvataggio.getName(),jobParameters );
	}catch(Exception e) {}
}


}
