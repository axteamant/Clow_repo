from linkedin_scraper import Person, actions
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
import Settings

class Scrape_my_app_2():
    @staticmethod
    def scrape(proxy_ip, lista,username =Settings.username,
                        password = Settings.password):
        first= True
        lista_result= []
        for persona in lista:
            print("Starting " + proxy_ip)
            try:
                for element in lista: 
                    PROXY = str(proxy_ip)
                if Settings.Proxy_request :
                    webdriver.DesiredCapabilities.CHROME['proxy']={
                            "httpProxy": PROXY,
                            "ftpProxy":PROXY,
                            "sslProxy":PROXY,
                            "noProxy":None,
                            "proxyType":"MANUAL",
                            "autodetect":False
                        }
                if first :
                        first= False
                        driver = webdriver.Chrome(ChromeDriverManager().install())
                        actions.login(driver, username, password) # if email and password isnt given, it'll prompt in terminal
                person = Person(persona, driver=driver,close_on_complete=False)
                print(person)
                lista_result.append(person)
            except Exception as e: print(e)
        try:
            driver.quit()
        except Exception as e: print(e)
        print("FINE DEL THREADS")
        return lista_result
            
        
        
