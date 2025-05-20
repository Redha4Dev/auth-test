import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

// Child Profile Page
class ChildProfilePage extends StatefulWidget {
  final String childId;
  final String childName;
  final String gender; // 'male' or 'female'

  const ChildProfilePage({
    Key? key,
    required this.childId,
    required this.childName,
    required this.gender,
  }) : super(key: key);

  @override
  State<ChildProfilePage> createState() => _ChildProfilePageState();
}

class _ChildProfilePageState extends State<ChildProfilePage> {
  bool isLoading = true;
  Map<String, dynamic>? childData;
  
  // Define color variables based on gender
  late Color primaryColor;
  late Color secondaryColor;
  late Color accentColor;
  
  // Skill categories and their current levels
  Map<String, Map<String, String>> skillCategories = {
    'Wellbeing': {'level': 'medium', 'color': 'blue'},
    'Discipline': {'level': 'high', 'color': 'green'},
    'Social Skills': {'level': 'medium', 'color': 'blue'},
    'Homework': {'level': 'medium', 'color': 'blue'},
    'Independence': {'level': 'medium', 'color': 'blue'},
    'Confidence': {'level': 'medium', 'color': 'blue'},
    'Listening': {'level': 'medium', 'color': 'blue'},
    'Speaking': {'level': 'medium', 'color': 'blue'},
    'Imagination': {'level': 'medium', 'color': 'blue'},
    'Creativity': {'level': 'medium', 'color': 'blue'},
    'Communication': {'level': 'medium', 'color': 'blue'},
    'Emotion': {'level': 'medium', 'color': 'blue'},
  };

  @override
  void initState() {
    super.initState();
    // Set colors based on gender
    setGenderColors();
    // Fetch child data
    fetchChildData();
  }

  void setGenderColors() {
    if (widget.gender.toLowerCase() == 'female') {
      primaryColor = const Color(0xFFFF80AB); // Pink for girls
      secondaryColor = const Color(0xFFF8BBD0);
      accentColor = const Color(0xFFEC407A);
    } else {
      primaryColor = const Color(0xFF2196F3); // Blue for boys
      secondaryColor = const Color(0xFF90CAF9);
      accentColor = const Color(0xFF1976D2);
    }
  }

  Future<void> fetchChildData() async {
    setState(() {
      isLoading = true;
    });

    try {
      final uri = Uri.parse('http://10.0.2.2:5000/admin/manage-kids')
          .replace(queryParameters: {'name': widget.childName, 'id': widget.childId});

      final response = await http.get(uri);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          childData = data['kid'];
          isLoading = false;
          
          // Update skill levels if available in the API response
          if (childData != null && childData!.containsKey('skills')) {
            final skills = childData!['skills'] as Map<String, dynamic>;
            skills.forEach((key, value) {
              if (skillCategories.containsKey(key)) {
                skillCategories[key]!['level'] = value.toString();
                
                // Set color based on level
                if (value == 'high') {
                  skillCategories[key]!['color'] = 'green';
                } else if (value == 'medium') {
                  skillCategories[key]!['color'] = 'blue';
                } else if (value == 'low') {
                  skillCategories[key]!['color'] = 'red';
                }
              }
            });
          }
        });
      } else {
        final error = jsonDecode(response.body);
        print('⚠️ Failed to fetch kid info: ${error['message']}');
        setState(() {
          isLoading = false;
        });
      }
    } catch (e) {
      print('❌ Error fetching kid info: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  // Get color for skill level
  Color getSkillColor(String level) {
    switch (level.toLowerCase()) {
      case 'high':
        return Colors.green;
      case 'medium':
        return primaryColor;
      case 'low':
        return Colors.red;
      case 'warning':
        return Colors.orange;
      default:
        return primaryColor;
    }
  }

  // Update skill level
  void updateSkillLevel(String skill, String newLevel) {
    setState(() {
      skillCategories[skill]!['level'] = newLevel;
      
      // Update color based on new level
      if (newLevel == 'high') {
        skillCategories[skill]!['color'] = 'green';
      } else if (newLevel == 'medium') {
        skillCategories[skill]!['color'] = 'blue';
      } else if (newLevel == 'low') {
        skillCategories[skill]!['color'] = 'red';
      } else if (newLevel == 'warning') {
        skillCategories[skill]!['color'] = 'orange';
      }
    });
    
    // Here you would call your API to update the skill level
    // Example: updateSkillOnServer(widget.childId, skill, newLevel);
  }

  Future<void> updateSkillOnServer(String childId, String skill, String level) async {
    try {
      final uri = Uri.parse('http://10.0.2.2:5000/admin/update-skill');
      
      final response = await http.post(
        uri,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'id': childId,
          'skill': skill,
          'level': level,
        }),
      );

      if (response.statusCode == 200) {
        print('✅ Skill updated successfully');
      } else {
        final error = jsonDecode(response.body);
        print('⚠️ Failed to update skill: ${error['message']}');
      }
    } catch (e) {
      print('❌ Error updating skill: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        title: Text('${widget.childName}\'s Profile'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Profile Header
                  Container(
                    color: primaryColor,
                    padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
                    child: Column(
                      children: [
                        // Profile Image
                        CircleAvatar(
                          radius: 50,
                          backgroundColor: Colors.white,
                          backgroundImage: childData != null && childData!.containsKey('photoUrl')
                              ? NetworkImage(childData!['photoUrl'])
                              : null,
                          child: childData == null || !childData!.containsKey('photoUrl')
                              ? const Icon(Icons.person, size: 50, color: Colors.grey)
                              : null,
                        ),
                        const SizedBox(height: 10),
                        
                        // Child Info
                        Text(
                          widget.childName,
                          style: const TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        Text(
                          'Family Name: ${childData?['familyName'] ?? 'N/A'}',
                          style: const TextStyle(
                            fontSize: 16,
                            color: Colors.white,
                          ),
                        ),
                        Text(
                          'Class: ${childData?['class'] ?? 'N/A'} | Age: ${childData?['age'] ?? 'N/A'}',
                          style: const TextStyle(
                            fontSize: 16,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  
                  // Wave Separator
                  CustomPaint(
                    painter: WavePainter(primaryColor),
                    size: const Size(double.infinity, 30),
                  ),
                  
                  // Skills Section
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Skills Assessment',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        
                        // Skills Grid
                        Wrap(
                          spacing: 8,
                          runSpacing: 12,
                          children: skillCategories.entries.map((entry) {
                            final skill = entry.key;
                            final level = entry.value['level'] ?? 'medium';
                            final color = getSkillColor(level);
                            
                            return GestureDetector(
                              onTap: () {
                                _showSkillLevelDialog(context, skill, level);
                              },
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                                decoration: BoxDecoration(
                                  color: color,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text(
                                  skill,
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            );
                          }).toList(),
                        ),
                        
                        const SizedBox(height: 24),
                        
                        // Notes Section
                        const Text(
                          'Notes',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            border: Border.all(color: Colors.grey.shade300),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: TextField(
                            maxLines: 4,
                            decoration: const InputDecoration(
                              hintText: 'Add notes about this child...',
                              border: InputBorder.none,
                            ),
                            onChanged: (value) {
                              // Save notes
                            },
                          ),
                        ),
                        
                        const SizedBox(height: 24),
                        
                        // Attendance Section
                        const Text(
                          'Attendance',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.grey.shade100,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: [
                              _buildAttendanceStat('Present', '85%', Icons.check_circle, Colors.green),
                              _buildAttendanceStat('Absent', '10%', Icons.cancel, Colors.red),
                              _buildAttendanceStat('Late', '5%', Icons.access_time, Colors.orange),
                            ],
                          ),
                        ),
                        
                        const SizedBox(height: 24),
                        
                        // Action Buttons
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            _buildActionButton('Contact Parents', Icons.phone, primaryColor),
                            _buildActionButton('View Reports', Icons.assessment, accentColor),
                          ],
                        ),
                        
                        const SizedBox(height: 40),
                      ],
                    ),
                  ),
                ],
              ),
            ),
    );
  }

  Widget _buildAttendanceStat(String label, String value, IconData icon, Color color) {
    return Column(
      children: [
        Icon(icon, color: color, size: 28),
        const SizedBox(height: 8),
        Text(
          value,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
        Text(
          label,
          style: const TextStyle(
            fontSize: 14,
            color: Colors.black54,
          ),
        ),
      ],
    );
  }

  Widget _buildActionButton(String label, IconData icon, Color color) {
    return ElevatedButton.icon(
      onPressed: () {
        // Handle button press
      },
      icon: Icon(icon),
      label: Text(label),
      style: ElevatedButton.styleFrom(
        backgroundColor: color,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      ),
    );
  }

  void _showSkillLevelDialog(BuildContext context, String skill, String currentLevel) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Update $skill Level'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildLevelOption(context, skill, 'High', Colors.green, currentLevel),
            _buildLevelOption(context, skill, 'Medium', primaryColor, currentLevel),
            _buildLevelOption(context, skill, 'Low', Colors.red, currentLevel),
            _buildLevelOption(context, skill, 'Warning', Colors.orange, currentLevel),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
        ],
      ),
    );
  }

  Widget _buildLevelOption(BuildContext context, String skill, String level, Color color, String currentLevel) {
    final isSelected = level.toLowerCase() == currentLevel.toLowerCase();
    
    return ListTile(
      leading: Container(
        width: 24,
        height: 24,
        decoration: BoxDecoration(
          color: color,
          shape: BoxShape.circle,
        ),
      ),
      title: Text(level),
      trailing: isSelected ? const Icon(Icons.check, color: Colors.green) : null,
      onTap: () {
        updateSkillLevel(skill, level.toLowerCase());
        Navigator.pop(context);
      },
    );
  }
}

// Wave Painter for the curved transition
class WavePainter extends CustomPainter {
  final Color color;
  
  WavePainter(this.color);
  
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;
      
    final path = Path();
    path.lineTo(0, 0);
    path.lineTo(0, size.height * 0.5);
    
    // Create a wave effect
    path.quadraticBezierTo(
      size.width * 0.25, 
      size.height, 
      size.width * 0.5, 
      size.height * 0.5
    );
    
    path.quadraticBezierTo(
      size.width * 0.75, 
      0, 
      size.width, 
      size.height * 0.5
    );
    
    path.lineTo(size.width, 0);
    path.close();
    
    canvas.drawPath(path, paint);
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}