package it.ant.application;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
@ComponentScan ({ "it" })
@SpringBootApplication
@EnableScheduling
@EnableAutoConfiguration (exclude = {DataSourceAutoConfiguration.class})
@SpringBootConfiguration 
public class main extends SpringBootServletInitializer {
	public main() 
	{
		super();
		setRegisterErrorPageFilter(false);
	}
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) 
	{
		return application.sources(main.class);
	}
	public static void main(String[] args) 
	{
		SpringApplication.run(main.class, args);
	}
}
