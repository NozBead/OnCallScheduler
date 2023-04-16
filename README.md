#OnCallScheduler

## Description

This project aims to generate schedules for the on call duty of a team.  
It supports some constraints :
- Each member must be assigned at most one times per month.
- Each member must be assigned only on the week or the weekend not both.
- Each member should be alternating between week duty and weekend duty.

Currently the generation is implemented by maintening a queue of available team member for assignement.

The Javascript part creates the schedule table in order to be saved or printed.

## Building

	mvn package

## Running

	java -jar target/server-0.1-SNAPSHOT.jar

## Interface

The interface is accessible via the url `http://localhost:8080`
