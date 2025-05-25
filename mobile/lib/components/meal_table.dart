import 'package:flutter/material.dart';

class MealTable extends StatelessWidget {
  final List<Map<String, dynamic>> meals;

  const MealTable({Key? key, required this.meals}) : super(key: key);

  String _formatTime(String time) {
    return time.split(':').take(2).join('h');
  }

  String _getDayName(int day) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    return days[day];
  }

  Color _getMealColor(String title) {
    // Different pastel colors for different meal types
    if (title.toLowerCase().contains('breakfast')) {
      return const Color(0xFFFFE0B2); // Pastel Orange
    } else if (title.toLowerCase().contains('lunch')) {
      return const Color(0xFFB2DFDB); // Pastel Green
    } else if (title.toLowerCase().contains('snack')) {
      return const Color(0xFFFFCCBC); // Pastel Red
    } else {
      return const Color(0xFFD1C4E9); // Pastel Purple
    }
  }

  IconData _getMealIcon(String title) {
    if (title.toLowerCase().contains('breakfast')) {
      return Icons.free_breakfast;
    } else if (title.toLowerCase().contains('lunch')) {
      return Icons.restaurant;
    } else if (title.toLowerCase().contains('snack')) {
      return Icons.cookie;
    } else {
      return Icons.dinner_dining;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          const Padding(
            padding: EdgeInsets.only(bottom: 16),
            child: Text(
              'Weekly Meal Schedule',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xFF7B61FF),
              ),
            ),
          ),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: meals.length,
            itemBuilder: (context, index) {
              final meal = meals[index];
              final List<int> days = List<int>.from(meal['daysOfWeek']);
              final dayNames = days.map((day) => _getDayName(day)).join(', ');
              final timeRange =
                  '${_formatTime(meal['startTime'])} - ${_formatTime(meal['endTime'])}';
              final mealColor = _getMealColor(meal['title']);
              final mealIcon = _getMealIcon(meal['title']);

              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                elevation: 2,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: mealColor,
                      width: 2,
                    ),
                  ),
                  child: Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: mealColor.withOpacity(0.2),
                          borderRadius: const BorderRadius.only(
                            topLeft: Radius.circular(10),
                            topRight: Radius.circular(10),
                          ),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              mealIcon,
                              color: const Color(0xFF7B61FF),
                              size: 24,
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Text(
                                meal['title'],
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF7B61FF),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Row(
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      const Icon(
                                        Icons.calendar_today,
                                        size: 16,
                                        color: Colors.grey,
                                      ),
                                      const SizedBox(width: 8),
                                      Expanded(
                                        child: Text(
                                          dayNames,
                                          style: TextStyle(
                                            color: Colors.grey.shade700,
                                            fontSize: 14,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 8),
                                  Row(
                                    children: [
                                      const Icon(
                                        Icons.access_time,
                                        size: 16,
                                        color: Colors.grey,
                                      ),
                                      const SizedBox(width: 8),
                                      Text(
                                        timeRange,
                                        style: TextStyle(
                                          color: Colors.grey.shade700,
                                          fontSize: 14,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
