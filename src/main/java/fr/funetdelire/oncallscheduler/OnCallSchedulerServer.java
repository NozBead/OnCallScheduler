package fr.funetdelire.oncallscheduler;

import org.springframework.boot.SpringApplication;

import fr.funetdelire.oncallscheduler.config.OnCallSchedulerConfig;

public class OnCallSchedulerServer {
	
	public static void main(String[] args) {
		SpringApplication.run(OnCallSchedulerConfig.class, args);
	}
}
