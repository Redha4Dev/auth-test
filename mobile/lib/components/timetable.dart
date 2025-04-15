import 'package:flutter/material.dart';

class MyTimeTable extends StatefulWidget {
 
final List<String> days;
final List<String> timeSlots;
final List<List<String>> schedule;

 
  const MyTimeTable({super.key, required this.days, required this.timeSlots, required this.schedule});

  @override
  State<MyTimeTable> createState() => _MyTimeTableState();
}

class _MyTimeTableState extends State<MyTimeTable> {
  
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Table(
                      defaultColumnWidth: FixedColumnWidth(120.0),
                      border: TableBorder.all(color: Colors.black12),
                      children: [
                        TableRow(
                          children: [
                            Container(),
                            ...widget.days
                                .map((day) => Center(
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Text(
                                          day,
                                          style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ),
                                    ))
                                .toList(),
                          ],
                        ),
                        for (int i = 0; i < widget.timeSlots.length; i++)
                          TableRow(
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Text(widget.timeSlots[i]),
                              ),
                              for (int j = 0; j < widget.days.length; j++)
                                Container(
                                  padding: const EdgeInsets.all(8.0),
                                  color: Colors
                                      .primaries[
                                          (i * j + 2) % Colors.primaries.length]
                                      .shade100,
                                  child: Center(
                                    child: Text(
                                      widget.schedule[j][i],
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                )
                            ],
                          )
                      ],
                    ),
                  );
  }
}