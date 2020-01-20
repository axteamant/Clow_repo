package it.ant.components;

import java.sql.SQLException;

import javax.sql.DataSource;
import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.validation.annotation.Validated;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;

@Configuration
@PropertySource("classpath:databases.properties")
@ConfigurationProperties("mysql")
@Validated
public class MysqlConfiguration {

	public static DataSource data=null;
	@NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String url;
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setUrl(String url) {
        this.url = url;
    }
  
   
    @Bean(name= "Mysql")
    @Primary
   public  DataSource dataSource() throws SQLException {
    	MysqlDataSource mysqlDS = new MysqlDataSource();
		mysqlDS.setURL(url);
		mysqlDS.setUser(username);
		mysqlDS.setPassword(password);
		
		data=mysqlDS;
		return mysqlDS;
    }
	public static DataSource getData() {
		return data;
	}
	public static void setData(DataSource data) {
		MysqlConfiguration.data = data;
	}
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public String getUrl() {
		return url;
	}
    
}
