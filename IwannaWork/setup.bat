
SET %pythox%  = "" 
SET  %pippx%   = ""
IF "%1"==""  %HOMEDRIVE%%HOMEPATH%\AppData\Local\Programs\Python\Python39\caraprr.exe -version >nul 2>&1 && (
   	SET %pythox%  = "%HOMEDRIVE%%HOMEPATH%\AppData\Local\Programs\Python\Python39\"
	   cd  "libs"
	cmd /K  "python-3.9.4-amd64.exe"
	cd ".."
	SET %pippx%  = "%HOMEDRIVE%%HOMEPATH%\AppData\Local\Programs\Python\Python39\Scripts\"
    python libs/get-pip.py 
) || ( echo python exist )
IF "%1"=="" pip.exe -version >nul 2>&1 && (
   %pythox%python.exe libs/get-pip.py 
   SET %pippx%  = "%HOMEDRIVE%%HOMEPATH%\AppData\Local\Programs\Python\Python39\Scripts\"
) || ( 
 echo pip exist;
 %pippx%pip install -r "%cd%/requirements"  )
IF "%1"=="" %pippx%\pip.exe install -r "%cd%/requirements" 
echo "immettere credenziali per schedulare al avvio"
IF "%1"=="" runas /user:Administrator %cd%/definejob.bat
echo %pythox%

%pythox%python.exe cheat.py 
