package it.ant.ftp.ftp;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;
import org.apache.tomcat.util.http.fileupload.IOUtils;

public class Zipfile {

  public static void zipFile(final File[] files, final File targetZipFile) throws IOException {
    try 
    {
	      FileOutputStream   fos = new FileOutputStream(targetZipFile);
	      ZipOutputStream zos = new ZipOutputStream(fos);
	      byte[] buffer = new byte[128];
	      for (int i = 0; i < files.length; i++) {
	        File currentFile = files[i];
	        if (!currentFile.isDirectory())
	        {
	        	try
	        	{
	        	ZipFile zipFile = new ZipFile(currentFile);
	        	zipFile.close();
	        	}catch(Exception e) {
	        		
		          ZipEntry entry = new ZipEntry(currentFile.getName());
		          FileInputStream fis = new FileInputStream(currentFile);
		          zos.putNextEntry(entry);
		          int read = 0;
		          while ((read = fis.read(buffer)) != -1) {
		            zos.write(buffer, 0, read);
		          } 
		          fis.close();
	          }
	        	zos.finish();
	        	zos.flush();
	        	zos.closeEntry();
	        }
	      }
	      zos.close();
	      fos.close();
    } catch (FileNotFoundException e) {
   
    }

  }
  /**
   * Crea un nuovo file
   * @param destinationDir destinazione del file
   * @param zipEntry file zip di entrata
   * @return il file cosi creato
   * @throws IOException propaga eccezione se non riesce a creare il file
   */
  public static File newFile(File destinationDir, ZipEntry zipEntry) throws IOException {
      File destFile = new File(destinationDir, zipEntry.getName());
      
      String destDirPath = destinationDir.getCanonicalPath();
      String destFilePath = destFile.getCanonicalPath();
       
      if (!destFilePath.startsWith(destDirPath + File.separator)) {
          throw new IOException();
      }
       
      return destFile;
  }
  /**
   * Estrae i file da un file zip
   * @param fileZip percorso del file da zippare
   * @param destination destinazione dello zip
   * @throws IOException propaga eccezione se non riesce trovare i file
   */
  public static void Unzip(String fileZip,String destination ) throws IOException {
     
      File destDir = new File(destination);
      byte[] buffer = new byte[1024];
      ZipInputStream zis = new ZipInputStream(new FileInputStream(fileZip));
      ZipEntry zipEntry = zis.getNextEntry();
      while (zipEntry != null) 
      {
          File newFile = newFile(destDir, zipEntry);
          FileOutputStream fos = new FileOutputStream(newFile);
          int len;
          while ((len = zis.read(buffer)) > 0) 
          {fos.write(buffer, 0, len);}
          fos.close();
          zipEntry = zis.getNextEntry();
      }
      zis.closeEntry();
      zis.close();
  }
  public static boolean isGZipped(InputStream in) {
	  try {
		return new ZipInputStream(in).getNextEntry() != null;
	} catch (IOException e) {

	};
	return false;
	 }
  public static void copy(InputStream initialStream,String directory ) throws Exception
  {
	  OutputStream outStream = new FileOutputStream(directory);
	  
	    byte[] buffer = new byte[8 * 1024];
	    int bytesRead;
	    while ((bytesRead = initialStream.read(buffer)) != -1) {
	        outStream.write(buffer, 0, bytesRead);
	    }
	    IOUtils.closeQuietly(initialStream);
	    IOUtils.closeQuietly(outStream); 
	  
	  
  }
  
  
}