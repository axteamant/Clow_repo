package it.ant.coponents.dao;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public interface DataQuest {


	
	default public List<Map<String, String>> rows(String sql, java.sql.Connection connection)
	{
		
		
		List<Map<String, String>> res = new ArrayList<Map<String, String>>();
	
		try
		{
			ResultSet rs = connection.createStatement().executeQuery(sql);

			while (rs.next())
			{

				Map<String, String> map = new HashMap<String, String>();
				for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++)
					map.put(rs.getMetaData().getColumnLabel(i),
							rs.getString(i));
				res.add(map);

			}
			rs.close();
		}
		catch (SQLException e)
		{

		}

		return res;
	}

}
