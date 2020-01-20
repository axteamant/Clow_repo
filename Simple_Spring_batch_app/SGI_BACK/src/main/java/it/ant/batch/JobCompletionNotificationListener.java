package it.ant.batch;

import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;

@EnableAutoConfiguration
@Component
public class JobCompletionNotificationListener
		extends
			JobExecutionListenerSupport{

	@Override
	public void afterJob(JobExecution jobExecution)
	{
		
	}
}
