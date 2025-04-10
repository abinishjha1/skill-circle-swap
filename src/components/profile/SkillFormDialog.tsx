
import { useForm } from "react-hook-form";
import { SkillCategory, SkillLevel } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SkillFormValues {
  name: string;
  category: SkillCategory;
  description: string;
  level: SkillLevel;
}

interface SkillFormDialogProps {
  isOffered: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddSkill: (isOffered: boolean) => void;
}

const SkillFormDialog = ({ isOffered, isOpen, setIsOpen, onAddSkill }: SkillFormDialogProps) => {
  const skillForm = useForm<SkillFormValues>({
    defaultValues: {
      name: "",
      category: "Technology",
      description: "",
      level: "Intermediate",
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isOffered ? 'Add Skill to Offer' : 'Add Skill You Want to Learn'}</DialogTitle>
        </DialogHeader>
        <Form {...skillForm}>
          <div className="grid gap-4 py-4">
            <FormField
              control={skillForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., JavaScript" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={skillForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[200px]">
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Language">Language</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Cooking">Cooking</SelectItem>
                        <SelectItem value="Fitness">Fitness</SelectItem>
                        <SelectItem value="Arts & Crafts">Arts & Crafts</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={skillForm.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={skillForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe your skill or what you want to learn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => onAddSkill(isOffered)}>
              Add Skill
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SkillFormDialog;
