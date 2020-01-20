package it.ant.batch;
import java.io.File;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.JobRegistry;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.support.JobRegistryBeanPostProcessor;
import org.springframework.batch.core.explore.JobExplorer;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.launch.support.SimpleJobOperator;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;

import it.ant.batch.ftpjob.FTPItemReader;
import it.ant.batch.ftpjob.FTPItemWriter;
import it.ant.batch.savedbjob.DBItemReader;
import it.ant.batch.savedbjob.DBItemWriter;

@SpringBootConfiguration
@EnableAutoConfiguration
@EnableBatchProcessing

public class BatchConfiguration<SpringBatchScheduler>
{

	@Bean
	public SimpleJobOperator jobOperator(JobExplorer jobExplorer,
			JobRepository jobRepository,
			JobRegistry jobRegistry) 
	{
		SimpleJobOperator jobOperator = new SimpleJobOperator();
		jobOperator.setJobExplorer(jobExplorer);
		jobOperator.setJobRepository(jobRepository);
		jobOperator.setJobRegistry(jobRegistry);
		jobOperator.setJobLauncher(jobLauncher);

		return jobOperator;
	}
	@Autowired
	JobLauncher jobLauncher;
	@Bean
	public JobRegistryBeanPostProcessor jobRegistryBeanPostProcessor(JobRegistry jobRegistry) 
	{
		JobRegistryBeanPostProcessor jobRegistryBeanPostProcessor = new JobRegistryBeanPostProcessor();
		jobRegistryBeanPostProcessor.setJobRegistry(jobRegistry);
		return jobRegistryBeanPostProcessor;
	}
	@Autowired
	public JobBuilderFactory jobBuilderFactory;
	@Autowired
	public StepBuilderFactory stepBuilderFactory;
	@Bean
	public ItemReader<File> FTPreader()
	{
		return new FTPItemReader();
	}
	@Bean
	public ItemWriter< File> FTPwriter()
	{
		return new FTPItemWriter();
	}
	@Bean
	public Job FTP(JobCompletionNotificationListener listener)
	{
		return jobBuilderFactory.get("FTP").incrementer(new RunIdIncrementer()).listener(listener).flow(FTPstep()).end().build();
	}
	/**
	 * Definisce l'ordine di esecuzione del job importFilesJob e il numero di blocchi 
	 * (records) prima che tutto il processo venga reiterato
	 * @param writer definto dal   ultimo step 
	 * @return lo Step definito
	 */
	@Bean
	public Step FTPstep()
	{
		return stepBuilderFactory.get("FTPstep").<File,File>chunk(1).reader(FTPreader()).writer(FTPwriter()).build();
	}
	/**
	 *<H1> Definisce il lavoro Remove_Old </H1>
	 * @param listener il listener del job Remove_Old
	 * @param step2 lo step del job Remove_Old
	 * @return il job appena definito
	 */
	@Bean
	public Job DataBaseSalvataggio ( )
	{
		return  jobBuilderFactory.get("DataBaseSalvataggio").incrementer(new RunIdIncrementer()).flow(DBStep()).end().build();
	}
	/**
	 * Definisce l'ordine di esecuzione del job Remove_Old
	 * @param writer definto dal   ultimo step  
	 * @return lo Step definito
	 */
	@Bean
	public Step DBStep()
	{
		return stepBuilderFactory.get("DBStep").<File,File>chunk(1).reader(DBreader()).writer(DBwriter()).build();
	}

	@Bean
	public ItemReader<? extends File> DBreader()
	{
		return new DBItemReader();
	}
	@Bean
	public ItemWriter<? super File> DBwriter()
	{
		return new DBItemWriter();
	}
}
