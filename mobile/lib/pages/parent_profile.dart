import 'package:flutter/material.dart';
import 'package:kidergarten/components/student_card.dart';

class HomePage extends StatelessWidget {
  final Color primaryColor = Color(0xFF5F3DC4);
  final TextStyle headerStyle =
      TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold);
  final TextStyle tableHeaderStyle =
      TextStyle(color: Colors.white, fontSize: 16);
  final TextStyle tableCellStyle = TextStyle(color: Colors.black, fontSize: 14);

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width; // Gives the width
    double screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: Colors.white,
      bottomNavigationBar: SizedBox(
        height: 59,
        child: BottomNavigationBar(
          iconSize: 30,
          elevation: 8.0,
          backgroundColor: primaryColor,
          selectedItemColor: Colors.white,
          unselectedItemColor: Colors.white54,
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: ''),
            BottomNavigationBarItem(icon: Icon(Icons.settings), label: ''),
          ],
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                height: screenHeight * 0.155,
                color: primaryColor,
                child: Center(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CircleAvatar(
                          radius: 40, backgroundColor: Colors.grey[300]),
                      SizedBox(width: 16),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Text("Name: ", style: TextStyle(color: Colors.white)),
                          Text("Email: ",
                              style: TextStyle(color: Colors.white)),
                          Text("Phone Number ",
                              style: TextStyle(color: Colors.white)),
                        ],
                        //+ globalParentData?['name']
                      ),
                    ],
                  ),
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(vertical: 10, horizontal: 16),
                color: Color(0xFFD9C7F3),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text("Weekly Menu",
                      style: headerStyle.copyWith(
                          color: const Color.fromARGB(255, 255, 255, 255),
                          fontWeight: FontWeight.bold)),
                ),
              ),
              Table(
                border: TableBorder.all(color: Colors.black),
                columnWidths: {
                  0: FlexColumnWidth(1),
                  1: FlexColumnWidth(2),
                  2: FlexColumnWidth(2),
                },
                children: [
                  TableRow(
                    decoration: BoxDecoration(color: primaryColor),
                    children: [
                      Padding(
                          padding: EdgeInsets.all(8),
                          child: Text("", style: tableHeaderStyle)),
                      Padding(
                          padding: EdgeInsets.all(8),
                          child: Text("Snacks", style: tableHeaderStyle)),
                      Padding(
                          padding: EdgeInsets.all(8),
                          child: Text("Lunch", style: tableHeaderStyle)),
                    ],
                  ),
                  ...["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
                      .asMap()
                      .entries
                      .map((entry) {
                    final index = entry.key;
                    final day = entry.value;
                    final snacks = [
                      "Rice Cakes/Yogurt + Milk",
                      "Muffins + Milk",
                      "Biscuits + Juice",
                      "Bread With honey + Milk",
                      "Baghrir/Pancakes"
                    ];
                    final lunch = [
                      "Chicken + Vegetables\nSliced Fruits",
                      "Chorba Frik + Bourak",
                      "Rechta + chicken\nHomemade compote",
                      "Pasta with meat\nYogurt",
                      "Mashed potato + Meat"
                    ];

                    return TableRow(children: [
                      Padding(
                          padding: EdgeInsets.all(8),
                          child: Text(day, style: tableCellStyle)),
                      Padding(
                          padding: EdgeInsets.all(8),
                          child: Text(snacks[index], style: tableCellStyle)),
                      Padding(
                          padding: EdgeInsets.all(8),
                          child: Text(lunch[index], style: tableCellStyle)),
                    ]);
                  }).toList()
                ],
              ),
              Container(
                padding: EdgeInsets.symmetric(vertical: 10, horizontal: 16),
                color: Color(0xFFD9C7F3),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    "List Of Children",
                    style: headerStyle.copyWith(
                      color: Color.fromARGB(255, 255, 255, 255),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              StudentCard(name: "tfdct", age: "5", gender: "Mouaad"),
              StudentCard(name: "Anis Boualdja", age: "4", gender: "Male"),
            ],
          ),
        ),
      ),
    );
  }
}

class ChildCard extends StatelessWidget {
  final String name;
  final int age;
  final String childClass;

  const ChildCard(
      {required this.name, required this.age, required this.childClass});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(color: Colors.purple.shade200)),
      child: ListTile(
        leading: CircleAvatar(
            backgroundImage: AssetImage('assets/avatar_placeholder.png')),
        title: Text("Full Name: $name"),
        subtitle: Text("Age: $age\nClass: $childClass"),
        trailing: Icon(Icons.more_vert),
      ),
    );
  }
}
