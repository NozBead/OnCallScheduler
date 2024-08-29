package fr.funetdelire.oncallscheduler.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoField;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fr.funetdelire.oncallscheduler.problem.OnCallProblem;
import fr.funetdelire.oncallscheduler.problem.OnCallSchedule;
import fr.funetdelire.oncallscheduler.problem.optimizer.OnCallHillClimber;
import fr.funetdelire.oncallscheduler.problem.solver.OnCallScheduleRandom;

@CrossOrigin
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
			OnCallHillClimber optimizer = new OnCallHillClimber(problem);
			OnCallSchedule random = solver.generate();
			
			return ResponseEntity.ok(optimizer.optimize(random));
		}
		catch (DateTimeParseException e) {
			return ResponseEntity.badRequest().build();
		}
	}
}
