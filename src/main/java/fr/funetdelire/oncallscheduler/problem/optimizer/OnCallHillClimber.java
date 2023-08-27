package fr.funetdelire.oncallscheduler.problem.optimizer;

import java.util.LinkedList;
import java.util.List;

import fr.funetdelire.oncallscheduler.problem.OnCallProblem;
import fr.funetdelire.oncallscheduler.problem.OnCallSchedule;

public class OnCallHillClimber {
	private OnCallProblem problem;
	
	public OnCallHillClimber(OnCallProblem problem) {
		this.problem = problem;
	}

	public OnCallSchedule optimize(OnCallSchedule schedule) {
		OnCallSchedule min = schedule;
		boolean lessExists = true;
		double minFitness = problem.getFitness(schedule);
		
		while (lessExists) {
			List<OnCallSchedule> neighbors = generateNeighbors(min);
			
			lessExists = false;
			for (OnCallSchedule neighbor : neighbors) {
				if (problem.checkSchedule(neighbor)) {
					double fitness = problem.getFitness(neighbor);
					if (fitness < minFitness) {
						lessExists = true;
						min = neighbor;
						minFitness = fitness;
					}
				}
			}
		}
		
		return min;
	}

	private List<OnCallSchedule> generateNeighbors(OnCallSchedule schedule) {
		List<OnCallSchedule> neighbors = new LinkedList<>();
		for (int i = 0 ; i < problem.getNumberOfWeeks() ; i++) {
			for (int j = 0 ; j < problem.getNumberOfWeeks() ; j++) {
				OnCallSchedule neighbor = schedule.clone();
				int personToSwap = neighbor.getWeeksSchedule()[i];
				neighbor.getWeeksSchedule()[i] = neighbor.getWeekEndsSchedule()[j];
				neighbor.getWeekEndsSchedule()[j] = personToSwap;
				neighbors.add(neighbor);
			}
		}
		return neighbors;
	}
}
