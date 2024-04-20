"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

const formUserScheme = z.object({
  name: z.string().min(1).max(20),
  description: z.string().min(1).max(20),
  // dynamic input
  socialMedia: z.array(
    z.object({
      name: z.string().min(1).max(20),
      link: z.string().url(),
    })
  ),
});

const FormUser = () => {
  const form = useForm<z.infer<typeof formUserScheme>>({
    resolver: zodResolver(formUserScheme),
    defaultValues: {
      name: "",
      description: "",
      socialMedia: [{ name: "", link: "" }],
    },
  });

  const supabase = createClient();

  const onSubmit = async (values: z.infer<typeof formUserScheme>) => {
    const payload = {
      name: values.name,
      social_media: values.socialMedia,
      description: values.description,
    };

    try {
      const { error } = await supabase
        .from("user_cards")
        .insert([payload])
        .select();

      if (error) throw new Error(error.message);

      toast.success("User created successfully");
    } catch (error) {
      toast.error(String(error));
    }
  };

  // dynamic input
  const [socialMedia, setSocialMedia] = useState([{ name: "", link: "" }]);

  return (
    <div className="bg-white p-4 rounded-md w-1/2 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {socialMedia.map((social, index) => (
            <div
              key={`socialMedia-[${index}]`}
              className="flex gap-2 items-center"
            >
              <FormField
                control={form.control}
                name={`socialMedia.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        onChange={(e) => {
                          setSocialMedia(
                            socialMedia.map((s, i) =>
                              i === index ? { ...s, name: e.target.value } : s
                            )
                          );
                          field.onChange(e.target.value);
                        }}
                        value={social.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`socialMedia.${index}.link`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Link"
                        {...field}
                        value={social.link}
                        onChange={(e) => {
                          setSocialMedia(
                            socialMedia.map((s, i) =>
                              i === index ? { ...s, link: e.target.value } : s
                            )
                          );
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                className="text-xl font-semibold "
                onClick={(e) => {
                  e.preventDefault();
                  setSocialMedia([...socialMedia, { name: "", link: "" }]);
                }}
              >
                +
              </Button>
              {socialMedia.length > 1 && (
                <Button
                  type="button"
                  className="text-xl font-semibold "
                  onClick={(e) => {
                    e.preventDefault();
                    setSocialMedia(socialMedia.filter((_, i) => i !== index));
                  }}
                >
                  -
                </Button>
              )}
            </div>
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default FormUser;
