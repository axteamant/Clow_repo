package it.ant.coponents.dao;

import java.io.File;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;

public class Dao implements DataQuest {

	@Autowired 
	DataSource db;
	
	public static Dao d= new Dao();
	public List< Map<String,String>> GetUser()
	{
		try {
			return rows("select * from user ", db.getConnection());
		} catch (SQLException e) {
			
		}
		return null;
		
	}
	
	public List< File>GetFile()
	{
		return null;
	
		
	}
	
}
