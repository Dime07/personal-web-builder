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
import { generateSlug } from "@/utils/helper";
import { useCreateUserCard } from "@/hooks/useCreateUserCard";
import { useCreateUser } from "@/hooks/useCreateUser";

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

  // dynamic input
  const [socialMedia, setSocialMedia] = useState([{ name: "", link: "" }]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formUserScheme>) => {
    setIsLoading(true);

    try {
      const { error: errorCreateUser, data } = await useCreateUser({
        name: values.name,
        slug: generateSlug(values.name),
      });

      if (errorCreateUser) throw new Error(errorCreateUser.message);

      const payload = {
        // TODO : learn dynamic input on react hook form
        social_media: socialMedia,
        description: values.description,
        user_id: data[0].id,
      };

      const { error: errorCreateCard } = await useCreateUserCard(payload);

      if (errorCreateCard) throw new Error(errorCreateCard.message);

      toast.success("User created successfully");
      form.reset();
      setSocialMedia([{ name: "", link: "" }]);
    } catch (error) {
      toast.error(String(error));
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="grid gap-2 grid-cols-3">
            <FormLabel>Social Media</FormLabel>
            <FormLabel>Link</FormLabel>
          </div>
          {socialMedia.map((social, index) => (
            <div
              key={`socialMedia-[${index}]`}
              className="grid grid-cols-3 gap-2 items-center"
            >
              <FormField
                control={form.control}
                name={`socialMedia.${index}.name`}
                render={({ field }) => (
                  <FormItem>
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
              <div className="flex gap-2">
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
            </div>
          ))}

          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormUser;
