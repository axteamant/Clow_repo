package it.ant.batch.savedbjob;

import java.io.File;

import java.util.List;

import org.springframework.batch.item.ItemWriter;

import it.ant.coponents.dao.StoreFile;

public class DBItemWriter implements ItemWriter<File> {

	
	@Override
	public void write(List<? extends File> files) throws Exception {
		for(File f: files)
		{
			
			try
			{
			StoreFile.saveFiles(f, f.getName(), "programmi");
			f.delete();
			}catch (Exception e) {e.printStackTrace();}
			
		}
		
	}



}
