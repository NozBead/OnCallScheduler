package fr.funetdelire.oncallscheduler.problem.solver;

import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.WeekFields;
import java.util.Collections;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

import fr.funetdelire.oncallscheduler.problem.OnCallProblem;
import fr.funetdelire.oncallscheduler.problem.OnCallSchedule;

public class OnCallScheduleRandom {
	private OnCallProblem problem;
	List<Integer> scheduledThisMonth = new LinkedList<Integer>();
	boolean[] wasOnWeekDuty;
	Deque<Integer> available = new LinkedList<>();
	LocalDate start;

	public OnCallScheduleRandom(OnCallProblem problem) {
		this.problem = problem;
		this.wasOnWeekDuty = new boolean[problem.getNumberOfPeople()];
	}
	
	private void init() {
		scheduledThisMonth.clear();
		available.clear();
		for (int i = 0 ; i < problem.getNumberOfPeople() ; i++) {
			available.add(i);
		}
		Collections.shuffle((List<?>) available);
		
		start = problem.getStartPoint();
	}
	
	private void assignFirstAvailable(int[] schedule, int week) {
		schedule[week] = available.poll();
		scheduledThisMonth.add(schedule[week]);
	}
	
	
	private int[] assignFirstAlternating(int[] weeksSchedule, int[] weekEndsSchedule, int week) {
		int person = available.peek();
		int[] schedule;
		if (wasOnWeekDuty[person]) {
			wasOnWeekDuty[person] = false;
			schedule = weekEndsSchedule;
		}
		else {
			wasOnWeekDuty[person] = true;
			schedule = weeksSchedule;
		}
		assignFirstAvailable(schedule, week);
		return schedule;
	}
	
	private void makeAvailableNewMonth() {
		Collections.shuffle(scheduledThisMonth);
		for (Integer n : scheduledThisMonth) {
			available.offer(n);
		}
		scheduledThisMonth.clear();
	}
	
	public OnCallSchedule generate() {
		init();
		
		OnCallSchedule schedule = new OnCallSchedule(problem);
		int[] weeksSchedule = schedule.getWeeksSchedule();
		int[] weekEndsSchedule = schedule.getWeekEndsSchedule();
		//TODO attention à la semaine d'avant voir si il était pas déjà d'astreinte
		int currentMonth = start.get(ChronoField.MONTH_OF_YEAR);
		for (int i = 0 ; i < problem.getNumberOfWeeks() ; i++) {
			int[] usedSchedule = assignFirstAlternating(weeksSchedule, weekEndsSchedule, i);
			int[] nextSchedule = usedSchedule == weekEndsSchedule ? weeksSchedule : weekEndsSchedule;
			assignFirstAvailable(nextSchedule, i);
	
			start = start.plusWeeks(1);
			int weekOfMonth = start.get(WeekFields.ISO.weekOfMonth());
			LocalDate testMonth = start.plusDays(6);
			int weekOfMonthAtEnd = testMonth.get(WeekFields.ISO.weekOfMonth());
			int newMonth = start.get(ChronoField.MONTH_OF_YEAR);
			if (currentMonth != newMonth || weekOfMonth != weekOfMonthAtEnd) {
				makeAvailableNewMonth();
				currentMonth = newMonth;
			}
		}
		
		return schedule;
	}
}
