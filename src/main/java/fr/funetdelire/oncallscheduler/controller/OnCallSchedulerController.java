package fr.funetdelire.oncallscheduler.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoField;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.funetdelire.oncallscheduler.problem.OnCallProblem;
import fr.funetdelire.oncallscheduler.problem.OnCallSchedule;
import fr.funetdelire.oncallscheduler.problem.solver.OnCallScheduleRandom;

@RestController
@RequestMapping(path="/scheduler")
public class OnCallSchedulerController {
	
	@GetMapping()
	public ResponseEntity<OnCallSchedule> get(@RequestParam String startDate, @RequestParam int numberOfPeople, @RequestParam int numberOfWeeks) {
		try {
			LocalDate date = LocalDate.parse(startDate, DateTimeFormatter.ISO_LOCAL_DATE);
			date = date.with(ChronoField.DAY_OF_WEEK, 1);
			
			OnCallProblem problem = new OnCallProblem(numberOfWeeks, numberOfPeople, date);
			OnCallScheduleRandom solver = new OnCallScheduleRandom(problem);
		
			return ResponseEntity.ok(solver.generate());
		}
		catch (DateTimeParseException e) {
			return ResponseEntity.badRequest().build();
		}
	}
}
