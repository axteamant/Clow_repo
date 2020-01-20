package it.ant.batch.ftpjob;

import java.io.File;
import java.util.List;

import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import it.ant.ftp.ftp.FTPServer;

public class FTPItemWriter implements ItemWriter<File> {


	@Autowired 
	FTPServer ftpserver;
	@Override
	public void write(List<? extends File> files) throws Exception {
	
		for(File f: files)
		{
			ftpserver.upload(f, f.getName());
			f.delete();
		
		}	
	}
}
