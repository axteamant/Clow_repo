package it.ant.coponents.dao;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import it.ant.components.MysqlConfiguration;


/**
 * Classe che si occupa di salvare e ricevere File dal database <br>
 * Usa javax.sql.DataSource
 * 
 * @author Alexei V.
 *
 */
public class StoreFile {

	static Connection c=null;
	public static void saveFiles(File f, String name, String nomeTabella) throws Exception
	{

		c = MysqlConfiguration.data.getConnection();
		PreparedStatement ps = c.prepareStatement(
				"insert INTO " + nomeTabella + " (nome,programma,DATA)  values (?,?,?)");
		;
		InputStream fr = new FileInputStream(f);
		ps.setString(1, name);
		ps.setBlob(2, fr, (int) f.length());
		ps.setDate(3, new java.sql.Date(System.currentTimeMillis()));;
		ps.executeUpdate();
		fr.close();
	}
	private static String cond;
	public static  void readFiles(String path, String tabella, String nomeCampo, String NomeFile)
			throws Exception {
		cond= NomeFile==null? "": "  where nome = '" + NomeFile + "'";
		InputStream in = null;// zip bytes
		OutputStream out;
		c = MysqlConfiguration.data.getConnection();
		System.out.println("select * from " + tabella  + cond);
		PreparedStatement ps = c.prepareStatement("select * from " + tabella  + cond );
		ResultSet rs = ps.executeQuery();
		while (rs.next() && rs.getBytes(nomeCampo) != null) {
			{
				File f= new File(path +"//" + rs.getString("nome"));
				f.createNewFile();
			
				in = new ByteArrayInputStream(rs.getBytes(nomeCampo));
				out = new FileOutputStream(path +"//" + rs.getString("nome") );
				byte[] buf = new byte[1024];
				int len;
				while ((len = in.read(buf)) > 0) {
					out.write(buf, 0, len);
				}
				in.close();
				out.close();
			}
		}
	
	}
	public static void truncate(String tabella)
	{
		try
		{
		c = MysqlConfiguration.data.getConnection();
		PreparedStatement ps = c.prepareStatement("truncate table " + tabella );
		ps.execute();
		}catch(Exception e) {System.out.println("Non è stata troncata la tabella del database");}
	}


}