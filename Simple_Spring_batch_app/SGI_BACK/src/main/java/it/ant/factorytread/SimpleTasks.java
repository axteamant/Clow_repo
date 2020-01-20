
package it.ant.factorytread;

import it.ant.batch.ScheduledTasks;

/**
 * @author ashraf
 *
 */
public class SimpleTasks 
{

	
	public static  class RunDB implements Runnable {
		public ScheduledTasks com;

		@Override
		public void run() {
			com.schedulingDB();
			
		}

	}

	public static class RunFtp implements Runnable
	{

		
		public ScheduledTasks com;

		@Override
		public void run() {
			com.schedulingFTP();
			
		}

	}

}
