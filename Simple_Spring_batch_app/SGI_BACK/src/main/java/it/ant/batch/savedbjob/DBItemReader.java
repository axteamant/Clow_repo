package it.ant.batch.savedbjob;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Autowired;

import it.ant.batch.ReadProp;
public class DBItemReader implements ItemReader<File> {
	
	@Autowired
	ReadProp promp;
	
	@Override
	public File read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
		if(list==null)
		{
			list= new ArrayList<>();
			readFiles();
		}
		try
		{
		File f= list.get(0); 
		list.remove(0);
		return f;	
		}catch(Exception e)
		{}
		list=null;
		return null;
	}
	public void readFiles() throws Exception
	{
	//System.out.println(System.getProperty("filesDb" )+ promp.getDatabasefolder());
		File[] f= new File( promp. getDatabasefolder()).listFiles();
		//database
		for(int i= 0; i<f.length; i++ )
		{
			list.add(f[i]);
		}
	}
	List<File> list= null;
}
