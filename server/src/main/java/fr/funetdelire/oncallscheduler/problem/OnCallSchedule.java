package fr.funetdelire.oncallscheduler.problem;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class OnCallSchedule implements Cloneable {
	private int[] weeksSchedule;
	private int[] weekEndsSchedule;
	@JsonIgnore
	private OnCallProblem problem;
	
	public OnCallSchedule(OnCallProblem problem) {
		this.problem = problem;
		this.weeksSchedule = new int[problem.getNumberOfWeeks()];
		this.weekEndsSchedule = new int[problem.getNumberOfWeeks()];
	}
	
	public OnCallProblem getProblem() {
		return problem;
	}

	public void setWeeksSchedule(int[] weeksSchedule) {
		this.weeksSchedule = weeksSchedule;
	}

	public void setWeekEndsSchedule(int[] weekEndsSchedule) {
		this.weekEndsSchedule = weekEndsSchedule;
	}

	public int[] getWeeksSchedule() {
		return weeksSchedule;
	}

	public int[] getWeekEndsSchedule() {
		return weekEndsSchedule;
	}
	
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Weeks schedule: \t").append(Arrays.toString(weeksSchedule)).append('\n');
		builder.append("Weekends schedule: \t").append(Arrays.toString(weekEndsSchedule)).append('\n');
		return builder.toString();
	}
	
	public OnCallSchedule clone() {
		OnCallSchedule schedule = new OnCallSchedule(problem);
		schedule.setWeekEndsSchedule(weekEndsSchedule.clone());
		schedule.setWeeksSchedule(weeksSchedule.clone());
		return schedule;
	}
}
