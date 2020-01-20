package it.ant.batch;

import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.validation.annotation.Validated;

@Configuration
@PropertySource("classpath:files.properties")
@ConfigurationProperties("files")
@Validated
public class ReadProp 
{
	@NotNull
    private String databasefolder;
	@NotNull
	private String filefromdatabase;
	@NotNull
	private String requestedfile;
	
	public String getFilefromdatabase() {
		return filefromdatabase;
	}
	public void setFilefromdatabase(String filefromdatabase) {
		this.filefromdatabase = filefromdatabase;
	}

	public String getDatabasefolder() {
		return databasefolder;
	}

	public void setDatabasefolder(String databasefolder) {
		this.databasefolder = databasefolder;
	}
	public String getRequestedfile() {
		return requestedfile;
	}
	public void setRequestedfile(String requestedfile) {
		this.requestedfile = requestedfile;
	}
	
}
	