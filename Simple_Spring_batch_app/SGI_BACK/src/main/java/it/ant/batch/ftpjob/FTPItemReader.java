package it.ant.batch.ftpjob;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Autowired;
import it.ant.batch.ReadProp;
import it.ant.coponents.dao.StoreFile;

public class FTPItemReader implements ItemReader<File> {

	@Autowired
	ReadProp promp;
	static File fileTemp=null;
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
		StoreFile.readFiles(promp.getFilefromdatabase(),"programmi","programma",null);
		File[] f= new File(promp.getFilefromdatabase()).listFiles();
		//database
		for(int i= 0; i<f.length; i++ )
		{
			list.add(f[i]);
		}
		StoreFile.truncate("programmi");
	}
	List<File> list= null;
}
