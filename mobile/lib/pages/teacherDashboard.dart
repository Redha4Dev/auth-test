import 'package:flutter/material.dart';
import 'package:kidergarten/components/studentCard.dart';
import 'package:kidergarten/components/timetable.dart';
import 'package:kidergarten/global.dart';

class TeacherDashboard extends StatefulWidget {
  const TeacherDashboard({super.key});

  @override
  State<TeacherDashboard> createState() => _TeacherDashboardState();
}

class _TeacherDashboardState extends State<TeacherDashboard> {
  bool showTimetable = false;
  bool showStudentList = false;
  int selectedClassIndex = 0;
  String searchQuery = "";
  String selectedSearchCriterion = "name";

  final List<List<Map<String, dynamic>>> studentsPerClass = [
    [
      {"name": "Lisie Alexander", "age": 6, "gender": "Female"},
      {"name": "Albert Flores", "age": 5, "gender": "Male"},
    ],
    [
      {"name": "Jerome Bell", "age": 6, "gender": "Male"},
      {"name": "Theresa Webb", "age": 5, "gender": "Female"},
    ],
    [
      {"name": "Floyd Miles", "age": 5, "gender": "Male"},
      {"name": "Camcron Williamson", "age": 6, "gender": "Male"},
    ],
  ];

  final List<String> days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ];

  final List<String> timeSlots = [
    "8h30 → 10h",
    "10h → 11h",
    "11h → 12h",
    "12h → 13h30",
    "13h30 → 14h30",
    "14h30 → 15h30",
    "15h30 → 16h30",
  ];

  final List<List<String>> schedule = [
    [
      "Islamic lesson",
      "Snack Time",
      "Group activity",
      "Lunch",
      "Nap / Free Play",
      "Movie time",
      "Outdoor game",
    ],
    [
      "English lesson",
      "Snack Time",
      "Quran session",
      "Lunch",
      "Nap / Free Play",
      "Reading",
      "Free play",
    ],
    [
      "Arabic lesson",
      "Snack Time",
      "Quran session",
      "Lunch",
      "Nap / Free Play",
      "Puppet show",
      "Outdoor game",
    ],
    [
      "French lesson",
      "Snack Time",
      "Drawing",
      "Lunch",
      "Nap / Free Play",
      "Reading",
      "Story Telling",
    ],
    [
      "Math lesson",
      "Snack Time",
      "Reading",
      "Lunch",
      "Nap / Free Play",
      "Quran session",
      "Outdoor game",
    ],
  ];

  @override
  Widget build(BuildContext context) {
    List<Map<String, dynamic>> filteredStudents =
        studentsPerClass[selectedClassIndex]
            .where((student) => student[selectedSearchCriterion]
                .toString()
                .toLowerCase()
                .contains(searchQuery.toLowerCase()))
            .toList();

    return SingleChildScrollView(
      child: Column(
        children: [
          Container(
            color: const Color(0xFF7B61FF),
            padding: const EdgeInsets.all(16),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                CircleAvatar(radius: 40, backgroundColor: Colors.grey[300]),
                const SizedBox(width: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Text("Name: ", style: TextStyle(color: Colors.white)),
                    Text("Email: ", style: TextStyle(color: Colors.white)),
                    Text("Phone Number ",
                        style: TextStyle(color: Colors.white)),
                  ],
                  //+ globalParentData?['name']
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(3, (index) {
                return ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: selectedClassIndex == index
                        ? const Color(0xFF7B61FF)
                        : Colors.white,
                    foregroundColor: selectedClassIndex == index
                        ? Colors.white
                        : Colors.black,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    side: const BorderSide(color: Color(0xFF7B61FF)),
                  ),
                  onPressed: () => setState(() => selectedClassIndex = index),
                  child: Text("Class ${index + 1}"),
                );
              }),
            ),
          ),
          ExpansionTile(
            backgroundColor:
                showTimetable ? const Color(0xFF7B61FF) : Colors.white,
            collapsedBackgroundColor: Colors.white,
            title: Text(
              "Timetable",
              style: TextStyle(
                color: showTimetable ? Colors.white : Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
            onExpansionChanged: (expanded) =>
                setState(() => showTimetable = expanded),
            children: [
              MyTimeTable(days: days, timeSlots: timeSlots, schedule: schedule)
            ],
          ),
          ExpansionTile(
            backgroundColor:
                showStudentList ? const Color(0xFF7B61FF) : Colors.white,
            collapsedBackgroundColor: Colors.white,
            title: Text(
              "List Of Students",
              style: TextStyle(
                color: showStudentList ? Colors.white : Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
            onExpansionChanged: (expanded) =>
                setState(() => showStudentList = expanded),
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        onChanged: (val) {
                          setState(() {
                            searchQuery = val;
                          });
                        },
                        decoration: InputDecoration(
                          hintText: 'Search for a Student',
                          prefixIcon: const Icon(Icons.search),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    DropdownButton<String>(
                      value: selectedSearchCriterion,
                      items: const [
                        DropdownMenuItem(
                            value: "name", child: Text("Search By Name")),
                        DropdownMenuItem(
                            value: "age", child: Text("Search By Age")),
                      ],
                      onChanged: (val) {
                        setState(() {
                          selectedSearchCriterion = val!;
                        });
                      },
                    )
                  ],
                ),
              ),
              SizedBox(
                height: 400,
                child: ListView(
                  children: (globalParentData?['kids'] as List<dynamic>)
                      .map((student) {
                    final Map<String, dynamic> s =
                        student as Map<String, dynamic>;
                    return StudentCard(
                      name: s['name'] ?? 'No name',
                      age: 0,
                      gender: 'Unknown',
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
