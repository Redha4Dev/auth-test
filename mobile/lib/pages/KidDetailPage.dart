import 'package:flutter/material.dart';
import 'package:kidergarten/services/api_service.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class KidDetailPage extends StatefulWidget {
  final String name;
  final String id;
  const KidDetailPage({Key? key, required this.name, required this.id})
      : super(key: key);

  @override
  State<KidDetailPage> createState() => _KidDetailPageState();
}

class _KidDetailPageState extends State<KidDetailPage> {
  Map<String, dynamic>? kidData;
  bool isLoading = true;
  bool isEditingGrades = false;
  bool isEditingSkills = false;
  String? errorMessage;
  final ApiService api = ApiService();

  // Controllers for grades
  final Map<String, TextEditingController> gradeControllers = {
    'Islamic': TextEditingController(),
    'English': TextEditingController(),
    'Arabic': TextEditingController(),
    'French': TextEditingController(),
    'Math': TextEditingController(),
  };

  // Controllers for skills
  final Map<String, double> skillValues = {
    'Discipline': 0,
    'Emotions': 0,
    'Teamwork': 0,
    'Confidence': 0,
    'Speaking': 0,
    'Creativity': 0,
    'Psychology': 0,
    'Communication': 0,
    'Listening': 0,
    'Imagination': 0,
    'Independence': 0,
  };

  @override
  void initState() {
    super.initState();
    _fetchKidDetails();
  }

  Future<void> _fetchKidDetails() async {
    setState(() => isLoading = true);
    final data = await api.getKidDetails(name: widget.name, id: widget.id);
    if (data != null) {
      setState(() {
        kidData = data;
        // Initialize grade controllers
        data['marks']?.forEach((subject, grade) {
          gradeControllers[subject]?.text = grade.toString();
        });
        // Initialize skill values
        if (data['skills'] != null) {
          data['skills'].forEach((String skill, dynamic value) {
            if (skillValues.containsKey(skill)) {
              skillValues[skill] = (value is int) ? value.toDouble() : 0.0;
            }
          });
        }
        isLoading = false;
      });
    } else {
      setState(() {
        errorMessage = 'Failed to load kid details.';
        isLoading = false;
      });
    }
  }

  Future<void> _saveGrades() async {
    final Map<String, int> updatedGrades = {};
    gradeControllers.forEach((subject, controller) {
      updatedGrades[subject] = int.tryParse(controller.text) ?? 0;
    });

    final success = await api.updateKidInfo(
      kidId: widget.id,
      updateData: {'marks': updatedGrades},
    );

    if (success) {
      setState(() => isEditingGrades = false);
      _showSuccessMessage('Grades updated successfully!');
    } else {
      _showErrorMessage('Failed to update grades.');
    }
  }

  Future<void> _saveSkills() async {
    final Map<String, int> updatedSkills = {};
    skillValues.forEach((skill, value) {
      if (value > 0) {
        updatedSkills[skill] = value.round();
      }
    });

    print('📤 Sending skills update: $updatedSkills');

    final success = await api.updateKidSkills(
      kidId: widget.id,
      skills: updatedSkills,
    );

    if (success) {
      setState(() => isEditingSkills = false);
      _showSuccessMessage('Skills updated successfully!');

      // Fetch fresh data after update
      final updatedData =
          await api.getKidDetails(name: widget.name, id: widget.id);
      print('📥 Updated kid data: $updatedData');

      if (updatedData != null) {
        setState(() {
          kidData = updatedData;
          // Re-initialize skill values from fresh data
          if (updatedData['skills'] != null) {
            print('🔄 Updating skill values with: ${updatedData['skills']}');
            updatedData['skills'].forEach((String skill, dynamic value) {
              if (skillValues.containsKey(skill)) {
                skillValues[skill] = (value is int) ? value.toDouble() : 0.0;
              }
            });
          }
        });
      }
    } else {
      print('⚠️ Failed to update skills');
      _showErrorMessage('Failed to update skills.');
    }
  }

  void _showSuccessMessage(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.green),
    );
  }

  void _showErrorMessage(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.red),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Kid Details'),
        backgroundColor: const Color(0xFF7B61FF),
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : errorMessage != null
              ? Center(
                  child: Text(errorMessage!,
                      style: const TextStyle(color: Colors.red)))
              : SingleChildScrollView(
                  child: Column(
                    children: [
                      _buildPersonalInfoSection(),
                      _buildGradesSection(),
                      _buildSkillsSection(),
                    ],
                  ),
                ),
    );
  }

  Widget _buildPersonalInfoSection() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          CircleAvatar(
            radius: 50,
            backgroundColor: const Color(0xFF7B61FF).withOpacity(0.1),
            child: Icon(
              kidData?['gender'] == 'Boy' ? Icons.face : Icons.face_3,
              size: 60,
              color: const Color(0xFF7B61FF),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            kidData?['name'] ?? '',
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          _buildInfoCard(),
        ],
      ),
    );
  }

  Widget _buildInfoCard() {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            _buildInfoRow('Age', '${kidData?['age']} years'),
            _buildInfoRow('Gender', kidData?['gender'] ?? ''),
            _buildInfoRow('Class', 'Class ${kidData?['classRoom']}'),
            _buildInfoRow('Parent', kidData?['parent'] ?? ''),
            _buildInfoRow('School', kidData?['school'] ?? ''),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.w500)),
          Text(value),
        ],
      ),
    );
  }

  Widget _buildGradesSection() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Grades',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              if (!isEditingGrades)
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () => setState(() => isEditingGrades = true),
                )
              else
                TextButton(
                  onPressed: _saveGrades,
                  child: const Text('Save'),
                ),
            ],
          ),
          const SizedBox(height: 16),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            childAspectRatio: 1.5,
            mainAxisSpacing: 16,
            crossAxisSpacing: 16,
            children: gradeControllers.entries.map((entry) {
              return _buildGradeCard(entry.key, entry.value);
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildGradeCard(String subject, TextEditingController controller) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(subject, style: const TextStyle(fontWeight: FontWeight.w500)),
            const SizedBox(height: 8),
            isEditingGrades
                ? TextField(
                    controller: controller,
                    keyboardType: TextInputType.number,
                    textAlign: TextAlign.center,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      contentPadding:
                          EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    ),
                  )
                : Text(
                    controller.text,
                    style: const TextStyle(
                        fontSize: 24, fontWeight: FontWeight.bold),
                  ),
          ],
        ),
      ),
    );
  }

  Widget _buildSkillsSection() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Skills',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              if (!isEditingSkills)
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () => setState(() => isEditingSkills = true),
                )
              else
                TextButton(
                  onPressed: _saveSkills,
                  child: const Text('Save'),
                ),
            ],
          ),
          const SizedBox(height: 16),
          ...skillValues.entries.map((entry) {
            return Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(entry.key),
                    Text(entry.value.round().toString()),
                  ],
                ),
                Slider(
                  value: entry.value,
                  min: 0,
                  max: 10,
                  divisions: 10,
                  activeColor: const Color(0xFF7B61FF),
                  onChanged: isEditingSkills
                      ? (value) {
                          setState(() => skillValues[entry.key] = value);
                        }
                      : null,
                ),
                const SizedBox(height: 8),
              ],
            );
          }).toList(),
        ],
      ),
    );
  }
}
