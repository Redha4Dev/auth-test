import 'package:flutter/material.dart';

class ChildNotesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.lightBlue[50],
      body: SafeArea(
        child: Column(
          children: [
            _buildProfileSection(),
            _buildTabBar(),
            _buildNotesTable(),
            _buildIllustration(),
            _buildImportantButton(),
          ],
        ),
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildProfileSection() {
    return Container(
      color: Colors.lightBlue,
      padding: EdgeInsets.all(12),
      child: Row(
        children: [
          CircleAvatar(
            radius: 40,
            backgroundColor: Colors.grey[400]
          ),
          SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text("Name : Floyd", style: TextStyle(color: Colors.white, fontSize: 16)),
              Text("Family Name : Miles", style: TextStyle(color: Colors.white, fontSize: 16)),
              Text("Class : A3", style: TextStyle(color: Colors.white, fontSize: 16)),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildTabBar() {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Expanded(
            child: Container(
              padding: EdgeInsets.symmetric(vertical: 10),
              color: Colors.lightBlueAccent,
              child: Center(
                child: Text("Child Notes", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ),
          ),
          Expanded(
            child: Container(
              padding: EdgeInsets.symmetric(vertical: 10),
              color: Colors.blue[100],
              child: Center(child: Text("Add Remarks", style: TextStyle(color: Colors.black))),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildNotesTable() {
    final subjects = ["Maths", "Arabic", "English", "French", "Islamic", "Total"];
    final notes = ["10", "9", "8", "10", "9.5", "9.3"];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: Table(
        border: TableBorder.all(),
        columnWidths: {0: FlexColumnWidth(2), 1: FlexColumnWidth(1)},
        children: [
          TableRow(
            decoration: BoxDecoration(color: Colors.lightBlueAccent),
            children: const [
              Padding(padding: EdgeInsets.all(8), child: Text("Subject", style: TextStyle(fontWeight: FontWeight.bold))),
              Padding(padding: EdgeInsets.all(8), child: Text("Note", style: TextStyle(fontWeight: FontWeight.bold))),
            ],
          ),
          for (int i = 0; i < subjects.length; i++)
            TableRow(
              children: [
                Padding(padding: EdgeInsets.all(8), child: Text(subjects[i])),
                Padding(padding: EdgeInsets.all(8), child: Text(notes[i])),
              ],
            )
        ],
      ),
    );
  }

  Widget _buildIllustration() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        //child: Image.asset("  ", height: 160), // ZAki idk how to add an svg image into fluter
      ),
    );
  }

  Widget _buildImportantButton() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      color: Colors.red,
      padding: EdgeInsets.all(12),
      child: Row(
        children: const [
          Expanded(child: Text("Important", style: TextStyle(color: Colors.white, fontSize: 16))),
          Icon(Icons.arrow_forward_ios, color: Colors.white, size: 18),
        ],
      ),
    );
  }

  Widget _buildBottomNav() {
    return BottomNavigationBar(
      backgroundColor: Colors.lightBlue,
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
