package it.ant.ftp.ftp;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.validation.constraints.NotNull;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.validation.annotation.Validated;
/**
 * Classe che si Connette ad un FTPServer
 *  @author Alexei V.
 */

@Configuration
@PropertySource("classpath:FTP.properties")
@ConfigurationProperties("ftpserver")
@Validated
public class FTPServer 
{	
	
public String getServer() {
		return server;
	}
	public void setServer(String server) {
		this.server = server;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getPort() {
		return port;
	}
	public void setPort(int port) {
		this.port = port;
	}
private  FTPClient ftpClient;
	@NotNull
	private String server;
	@NotNull
	private String user;
	@NotNull
	private String password;
	@NotNull
	private int port;

	@Bean(name= "ftpserver")
	public FTPServer ftpserver() throws Exception
	{
		System.out.println("port " +port);
		System.out.println("pass " + password);
		System.out.println("user " +user );
		FTPServer Server= new FTPServer();
		Server.ftpClient  = new FTPClient();
		Server.ftpClient.connect(server, port);
		Server.ftpClient.login(user, password);
		Server.ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
		Server.ftpClient.enterLocalPassiveMode();   
		return Server;
	}
//	private  FTPServer(String server,String user ,String pass,int port) throws Exception
//	{	
//	    ftpClient = new FTPClient();
//	    ftpClient.connect(server, port);
//	    ftpClient.login(user, pass);
//	    ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
//	    ftpClient.enterLocalPassiveMode();    
//	}
	/**
	 * <h1>disconnect from CFTP Server</h1>
	 * @throws IOException Errore del server
	 */
	public void disconnet() throws IOException
	{
		  if (ftpClient.isConnected())
		  {
			  ftpClient.logout();
			  ftpClient.disconnect();
		  }
	}
	/**
	 * <h1>DownLoad File from CFTP Server</h1>
	 * @param ServerFileName Nome del file nel server
	 * @param path path locale in cui verrà salvato il file
	 * @throws IOException errore del Server
	 */
	public  void downLoad(String ServerFileName,String path) throws IOException 
	{
		  OutputStream outputStream1 = new BufferedOutputStream(new FileOutputStream(path));
		  ftpClient.retrieveFile("/" + ServerFileName, outputStream1);
		  outputStream1.close();   
	}
	/**
	 * <h1>Upload File from CFTP Server</h1>
	 * @param path locale del file da inviare al CFTP server
	 * @param filename nome del file sul CFTP server
	 *@throws IOException errore del Server
	 */
	public  void upload(String path,String filename) throws IOException
	{ 
		File f= new File(path);
		FileInputStream fis = new FileInputStream(f);
		ftpClient.storeFile(filename, fis);
	
	}
	public  void upload(File f,String filename) throws IOException
	{ 
		
		FileInputStream fis = new FileInputStream(f);
		ftpClient.storeFile(filename, fis);
	
	}
	/**
	 * <h1>Delate File from CFTP Server</h1>
	 * @param filename nome del file da eliminare dal CFTP server
	 *@throws IOException errore del Server
	 */
	public void delate(String filename) throws IOException
	{
		ftpClient.deleteFile(filename);   
	}
	
}