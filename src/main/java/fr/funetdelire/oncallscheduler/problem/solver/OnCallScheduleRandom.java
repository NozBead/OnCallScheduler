package fr.funetdelire.oncallscheduler.problem.solver;

import java.util.Calendar;
import java.util.Collections;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

import fr.funetdelire.oncallscheduler.problem.OnCallProblem;
import fr.funetdelire.oncallscheduler.problem.OnCallSchedule;

public class OnCallScheduleRandom {
	private OnCallProblem problem;
	List<Integer> scheduledThisMonth = new LinkedList<Integer>();
	Deque<Integer> available = new LinkedList<>();
	Calendar start;

	public OnCallScheduleRandom(OnCallProblem problem) {
		this.problem = problem;
	}
	
	private void init() {
		scheduledThisMonth.clear();
		available.clear();
		for (int i = 0 ; i < problem.getNumberOfPeople() ; i++) {
			available.add(i);
		}
		Collections.shuffle((List<?>) available);
		
		start = (Calendar) problem.getStartPoint().clone();
	}
	
	private void assignFistAvailable(int[] schedule, int week) {
		schedule[week] = available.poll();
		scheduledThisMonth.add(schedule[week]);
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
	
		int currentMonth = start.get(Calendar.MONTH);
		for (int i = 0 ; i < problem.getNumberOfWeeks() ; i++) {
			assignFistAvailable(weeksSchedule, i);
			assignFistAvailable(weekEndsSchedule, i);
			
			start.roll(Calendar.WEEK_OF_YEAR, true);
			int newMonth = start.get(Calendar.MONTH);
			if (newMonth > currentMonth) {
				currentMonth = newMonth;
				makeAvailableNewMonth();
			}
		}
		
		return schedule;
	}
}
