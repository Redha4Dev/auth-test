import 'package:flutter/material.dart';
import 'package:kidergarten/components/studentCard.dart';

class TeacherHomePage extends StatefulWidget {
  const TeacherHomePage({super.key});

  @override
  State<TeacherHomePage> createState() => _TeacherHomePageState();
}

class _TeacherHomePageState extends State<TeacherHomePage> {
  bool showTimetable = false;
  bool showStudentList = false;
  int selectedClassIndex = 0;

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

  String searchQuery = "";
  String selectedSearchCriterion = "name";

  @override
  Widget build(BuildContext context) {
    List<Map<String, dynamic>> filteredStudents =
        studentsPerClass[selectedClassIndex]
            .where((student) => student[selectedSearchCriterion]
                .toLowerCase()
                .contains(searchQuery.toLowerCase()))
            .toList();

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                color: const Color(0xFF7B61FF),
                padding: const EdgeInsets.all(16),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    CircleAvatar(radius: 40, backgroundColor: Colors.grey[300]),
                    const SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text("Name : Fatima",
                            style: TextStyle(color: Colors.white)),
                        Text("Family Name : Benhacene",
                            style: TextStyle(color: Colors.white)),
                        Text("Email : f.benhachene@gmail.com",
                            style: TextStyle(color: Colors.white)),
                        Text("Phone Number : 0770504885",
                            style: TextStyle(color: Colors.white)),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                color: Colors.white,
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
                      onPressed: () =>
                          setState(() => selectedClassIndex = index),
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
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Table(
                      defaultColumnWidth: FixedColumnWidth(120.0),
                      border: TableBorder.all(color: Colors.black12),
                      children: [
                        TableRow(
                          children: [
                            Container(),
                            ...days
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
                        for (int i = 0; i < timeSlots.length; i++)
                          TableRow(
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Text(timeSlots[i]),
                              ),
                              for (int j = 0; j < days.length; j++)
                                Container(
                                  padding: const EdgeInsets.all(8.0),
                                  color: Colors
                                      .primaries[
                                          (i * j + 2) % Colors.primaries.length]
                                      .shade100,
                                  child: Center(
                                    child: Text(
                                      schedule[j][i],
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                )
                            ],
                          )
                      ],
                    ),
                  )
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
                              prefixIcon: Icon(Icons.search),
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10)),
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
                      children: filteredStudents
                          .map((student) => StudentCard(
                                name: student['name'],
                                age: student['age'],
                                gender: student['gender'],
                              ))
                          .toList(),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        selectedItemColor: const Color(0xFF7B61FF),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.chat_bubble), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.settings), label: ''),
        ],
      ),
    );
  }
}
