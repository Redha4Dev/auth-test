import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ChildNotesPage extends StatefulWidget {
  final String name;
  final String id;

  const ChildNotesPage({super.key, required this.name, required this.id});

  @override
  State<ChildNotesPage> createState() => _ChildNotesPageState();
}

class _ChildNotesPageState extends State<ChildNotesPage> {
  Map<String, dynamic>? childData;
  bool isLoading = true;
  String? errorMessage;

  @override
  void initState() {
    super.initState();
    _fetchChildData();
  }

  Future<void> _fetchChildData() async {
    print("🚀 Fetching kid info for ${widget.name} with ID ${widget.id}");
    final data = await getKidInfo(widget.name, widget.id);

    if (data != null) {
      setState(() {
        childData = data;
        isLoading = false;
      });
    } else {
      setState(() {
        errorMessage = "Failed to load child data.";
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.lightBlue[50],
      body: SafeArea(
        child: isLoading
            ? const Center(child: CircularProgressIndicator())
            : errorMessage != null
                ? Center(
                    child: Text(errorMessage!,
                        style: const TextStyle(color: Colors.red)))
                : Column(
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
    final name = childData?['name'] ?? 'Unknown';
    final familyName = childData?['family_name'] ?? 'Unknown';
    final className = childData?['class'] ?? 'N/A';

    print(
        "✅ Loaded Profile - Name: $name, Family: $familyName, Class: $className");

    return Container(
      color: Colors.lightBlue,
      padding: const EdgeInsets.all(12),
      child: Row(
        children: [
          CircleAvatar(
            radius: 40,
            backgroundColor: Colors.grey[400],
          ),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Name : $name",
                  style: const TextStyle(color: Colors.white, fontSize: 16)),
              Text("Family Name : $familyName",
                  style: const TextStyle(color: Colors.white, fontSize: 16)),
              Text("Class : $className",
                  style: const TextStyle(color: Colors.white, fontSize: 16)),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildTabBar() {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 10),
              color: Colors.lightBlueAccent,
              child: const Center(
                child: Text("Child Notes",
                    style: TextStyle(
                        color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ),
          ),
          Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 10),
              color: Colors.blue[100],
              child: const Center(
                child:
                    Text("Add Remarks", style: TextStyle(color: Colors.black)),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNotesTable() {
    final notes = childData?['notes'] ?? {}; // Should be a Map<String, dynamic>
    final subjects = notes.keys.toList();
    final values = subjects.map((s) => notes[s].toString()).toList();

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: Table(
        border: TableBorder.all(),
        columnWidths: const {
          0: FlexColumnWidth(2),
          1: FlexColumnWidth(1),
        },
        children: [
          const TableRow(
            decoration: BoxDecoration(color: Colors.lightBlueAccent),
            children: [
              Padding(
                  padding: EdgeInsets.all(8),
                  child: Text("Subject",
                      style: TextStyle(fontWeight: FontWeight.bold))),
              Padding(
                  padding: EdgeInsets.all(8),
                  child: Text("Note",
                      style: TextStyle(fontWeight: FontWeight.bold))),
            ],
          ),
          for (int i = 0; i < subjects.length; i++)
            TableRow(
              children: [
                Padding(
                    padding: const EdgeInsets.all(8), child: Text(subjects[i])),
                Padding(
                    padding: const EdgeInsets.all(8), child: Text(values[i])),
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildIllustration() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: Container(
          height: 160,
          color: Colors.grey[300],
          child: const Center(child: Text("Illustration Placeholder")),
        ),
      ),
    );
  }

  Widget _buildImportantButton() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      color: Colors.red,
      padding: const EdgeInsets.all(12),
      child: Row(
        children: const [
          Expanded(
            child: Text("Important",
                style: TextStyle(color: Colors.white, fontSize: 16)),
          ),
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
        BottomNavigationBarItem(
            icon: Icon(Icons.chat_bubble_outline), label: ""),
        BottomNavigationBarItem(icon: Icon(Icons.settings), label: ""),
      ],
    );
  }
}

// ----------------- FETCH FUNCTION ------------------

Future<Map<String, dynamic>?> getKidInfo(String name, String id) async {
  final uri = Uri.parse('http://10.0.2.2:5000/admin/manage-kids')
      .replace(queryParameters: {'name': name, 'id': id});

  try {
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      print('👶 Kid Info: ${data['kid']}');
      return data['kid'];
    } else {
      final error = jsonDecode(response.body);
      print('⚠️ Failed to fetch kid info: ${error['message']}');
    }
  } catch (e) {
    print('❌ Error fetching kid info: $e');
  }
  return null;
}
