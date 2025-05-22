import 'package:flutter/material.dart';

//zaki this is a boy child profile 

class TimetableScreen extends StatelessWidget {
  final List<String> days = ["Sunday", "Monday", "Tuesday", "Wedesn day", "Thurs day"];
  final List<List<String>> schedule = [
    ["Islamic lesson", "English lesson", "Arabic lesson", "French lesson", "Math lesson"],
    ["Snack Time", "Snack Time", "Snack Time", "Snack Time", "Snack Time"],
    ["Group activity", "Quran session", "Quran session", "Drawing", "Reading"],
    ["Lunch", "Lunch", "Lunch", "Lunch", "Lunch"],
    ["Nap / Free Play", "Nap / Free Play", "Nap / Free Play", "Nap / Free Play", "Nap / Free Play"],
    ["Movie time", "Reading", "Puppet show", "Reading", "Quran session"],
    ["Outdoor game", "Free play", "Outdoor game", "Story Telling", "Outdoor game"],
  ];

  final List<String> times = [
    "8h30 → 10h",
    "10h → 11h",
    "11h → 12h",
    "12h → 13h30",
    "13h30 → 14h30",
    "14h30 → 15h30",
    "15h30 → 16h30"
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.lightBlue[100],
      body: SafeArea(
        child: Column(
          children: [
            _buildProfile(),
            _buildTimetableHeader(),
            Expanded(child: _buildTimetableTable()),
            _buildButtons()
          ],
        ),
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildProfile() {
    return Container(
      padding: EdgeInsets.all(12),
      color: Colors.lightBlue,
      child: Row(
        children: [
          CircleAvatar(
            radius: 40,
            backgroundImage: AssetImage('assets/child.jpg'), // replace with NetworkImage if needed
          ),
          SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text("Name : Albert", style: TextStyle(color: Colors.white, fontSize: 16)),
              Text("Family Name : Flores", style: TextStyle(color: Colors.white, fontSize: 16)),
              Text("Class : A1", style: TextStyle(color: Colors.white, fontSize: 16)),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildTimetableHeader() {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 8),
      color: Colors.lightBlueAccent,
      child: Center(
        child: Text("Timetable", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
      ),
    );
  }

  Widget _buildTimetableTable() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Table(
        defaultColumnWidth: FixedColumnWidth(120),
        border: TableBorder.all(),
        children: [
          TableRow(
            children: [Container(), ...days.map((d) => _headerCell(d))],
          ),
          for (int i = 0; i < times.length; i++)
            TableRow(
              children: [
                _timeCell(times[i]),
                for (int j = 0; j < days.length; j++) _contentCell(schedule[i][j]),
              ],
            ),
        ],
      ),
    );
  }

  Widget _headerCell(String text) {
    return Container(
      padding: EdgeInsets.all(8),
      color: Colors.blue[200],
      child: Text(text, textAlign: TextAlign.center, style: TextStyle(fontWeight: FontWeight.bold)),
    );
  }

  Widget _timeCell(String time) {
    return Container(
      padding: EdgeInsets.all(8),
      color: Colors.grey[300],
      child: Text(time, textAlign: TextAlign.center),
    );
  }

  Widget _contentCell(String text) {
    return Container(
      padding: EdgeInsets.all(8),
      alignment: Alignment.center,
      child: Text(text, textAlign: TextAlign.center),
    );
  }

  Widget _buildButtons() {
    return Column(
      children: [
        _actionButton("All About This Child"),
        _actionButton("Switch Child"),
      ],
    );
  }

  Widget _actionButton(String label) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      padding: EdgeInsets.all(12),
      color: Colors.lightBlueAccent,
      child: Text(label, style: TextStyle(color: Colors.white, fontSize: 16)),
    );
  }

  Widget _buildBottomNav() {
    return BottomNavigationBar(
      backgroundColor: Colors.lightBlueAccent,
      selectedItemColor: Colors.white,
      unselectedItemColor: Colors.white70,
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: ""),
        BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline), label: ""),
        BottomNavigationBarItem(icon: Icon(Icons.settings), label: ""),
      ],
    );
  }
}
