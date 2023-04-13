package fr.funetdelire.oncallscheduler.serializer;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import fr.funetdelire.oncallscheduler.problem.OnCallSchedule;

public class OnCallHTMLSerializer {
	private String[] names;
	
	public OnCallHTMLSerializer(String[] names) {
		this.names = names;
	}

	public String serialize(OnCallSchedule schedule) {
		StringBuilder builder = new StringBuilder();
		StringBuilder dateBuilder = new StringBuilder();
		StringBuilder weeksBuilder = new StringBuilder();
		StringBuilder weekEndsBuilder = new StringBuilder();
		
		builder.append("Semaine :;");
		dateBuilder.append("Date :;");
		weeksBuilder.append("Astreinte de semaine :;");
		weekEndsBuilder.append("Astreinte de weekend :;");
		
		int[] weeksSchedule = schedule.getWeeksSchedule();
		int[] weekEndsSchedule = schedule.getWeekEndsSchedule();
		Calendar start = (Calendar) schedule.getProblem().getStartPoint().clone();
		DateFormat formater = new SimpleDateFormat("dd/MM/YYYY");
		for (int i = 0 ; i < weeksSchedule.length ; i++) {
			builder.append(start.get(Calendar.WEEK_OF_YEAR)).append(';');
			dateBuilder.append(formater.format(start.getTime())).append(';');
			weeksBuilder.append(names[weeksSchedule[i]]).append(';');
			weekEndsBuilder.append(names[weekEndsSchedule[i]]).append(';');
			start.roll(Calendar.WEEK_OF_YEAR, true);
		}
		builder.append('\n').append(dateBuilder);
		builder.append('\n').append(weeksBuilder);
		builder.append('\n').append(weekEndsBuilder);
		return builder.toString();
	}
}
